import mongoose from 'mongoose';

const getAll = async (MovieModel, queryParams) => {
  let aggregationField = {};
  let findQuery = {};
  let sortQuery = {};

  if (queryParams.sortBy === 'createdAt') {
    sortQuery = {
      ...sortQuery,
      createdAt: queryParams.dir ? parseInt(queryParams.dir, 10) : 1
    };
  }

  if (queryParams.createdBy) {
    findQuery = { ...findQuery, createdBy: queryParams.createdBy };
  }

  if (queryParams.sortBy === 'likes' || queryParams.sortBy === 'hates') {
    if (queryParams.sortBy === 'likes') {
      aggregationField = '$likedBy';
    }
    if (queryParams.sortBy === 'hates') {
      aggregationField = '$hatedBy';
    }
    const movies = await MovieModel.aggregate([
      {
        $match: queryParams.createdBy
          ? { createdBy: mongoose.Types.ObjectId(queryParams.createdBy) }
          : {}
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy'
        }
      },
      { $unwind: '$createdBy' },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          createdAt: 1,
          createdBy: 1,
          likedBy: 1,
          hatedBy: 1,
          length: { $size: aggregationField }
        }
      },
      {
        $sort: { length: queryParams.dir ? parseInt(queryParams.dir, 10) : 1 }
      }
    ]).exec();
    return movies;
  }

  const movies = await MovieModel.find(findQuery)
    .populate('createdBy')
    .sort(sortQuery);
  return movies;
};

const add = async (MovieModel, { name, description, createdBy }) => {
  const newMovie = new MovieModel({
    name,
    description,
    createdBy
  });
  const movie = await newMovie.save();
  return movie;
};

const like = async (MovieModel, movieId, userId) => {
  const movie = await MovieModel.findById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }
  if (movie.createdBy.toString() === userId) {
    throw new Error(
      'A user cannot vote for a movie that uploaded herself/himself'
    );
  }
  if (
    movie.likedBy &&
    movie.likedBy.map((item) => item.toString()).includes(userId)
  ) {
    throw new Error('You have already liked this movie');
  }
  if (
    movie.hatedBy &&
    movie.hatedBy.map((item) => item.toString()).includes(userId)
  ) {
    // remove user's id from hatedBy field
    await MovieModel.findByIdAndUpdate(
      movieId,
      { $pull: { hatedBy: userId } },
      { new: true }
    );
    // add user's id to likedBy field
    const addLikedBy = await MovieModel.findByIdAndUpdate(
      movieId,
      { $addToSet: { likedBy: userId } },
      { new: true }
    );
    return addLikedBy;
  }
  const updatedMovie = await MovieModel.findByIdAndUpdate(
    movieId,
    { $addToSet: { likedBy: userId } },
    { new: true }
  );
  return updatedMovie;
};

const hate = async (MovieModel, movieId, userId) => {
  const movie = await MovieModel.findById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }
  if (movie.createdBy.toString() === userId) {
    throw new Error(
      'A user cannot vote for a movie that uploaded herself/himself'
    );
  }
  if (
    movie.hatedBy &&
    movie.hatedBy.map((item) => item.toString()).includes(userId)
  ) {
    throw new Error('You have already hated this movie');
  }
  if (
    movie.likedBy &&
    movie.likedBy.map((item) => item.toString()).includes(userId)
  ) {
    await MovieModel.findByIdAndUpdate(
      movieId,
      { $pull: { likedBy: userId } },
      { new: true }
    );
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      { $addToSet: { hatedBy: userId } },
      { new: true }
    );
    return updatedMovie;
  }
  const updatedMovie = await MovieModel.findByIdAndUpdate(
    movieId,
    { $addToSet: { hatedBy: userId } },
    { new: true }
  );
  return updatedMovie;
};

const reset = async (MovieModel, movieId, userId) => {
  const movie = await MovieModel.findById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }
  if (movie.createdBy.toString() === userId) {
    throw new Error(
      'A user cannot reset his/her vote for a movie that uploaded herself/himself'
    );
  }
  if (
    movie.likedBy &&
    movie.likedBy.map((item) => item.toString()).includes(userId)
  ) {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      { $pull: { likedBy: userId } },
      { new: true }
    );
    return updatedMovie;
  }
  if (
    movie.hatedBy &&
    movie.hatedBy.map((item) => item.toString()).includes(userId)
  ) {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      { $pull: { hatedBy: userId } },
      { new: true }
    );
    return updatedMovie;
  }
  return movie;
};

export { getAll, add, like, hate, reset };
