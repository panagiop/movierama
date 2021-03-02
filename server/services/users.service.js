import { encryptPassword, generateToken } from './auth.service';

const create = async (UserModel, email, username, password) => {
  let user = await UserModel.findOne({ email, username });
  if (user) {
    const error = new Error('username or email already exists');
    error.statusCode = 401;
    throw error;
  }
  user = new UserModel({
    username,
    email,
    password
  });
  user.password = encryptPassword(password);

  await user.save();
  const payload = {
    user: {
      id: user._id
    }
  };
  const token = generateToken(payload);
  return token;
};

export { create };
