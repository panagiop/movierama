import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hatedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

MovieSchema.index({ createdAt: 1 });
MovieSchema.index({ likedBy: 1 });
MovieSchema.index({ hatedBy: 1 });
MovieSchema.index({ createdBy: 1, createdAt: 1 });
MovieSchema.index({ createdBy: 1, likedBy: 1 });
MovieSchema.index({ createdBy: 1, hatedBy: 1 });

const MovieModel = mongoose.model('Movie', MovieSchema);

MovieModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

export { MovieModel };
