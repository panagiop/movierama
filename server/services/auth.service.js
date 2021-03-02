import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config/config';

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compareToken = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

const verifyToken = (token) => jwt.verify(token, config.jwtSecret);

const generateToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, {
    expiresIn: 360000
  });

const login = async (UserModel, username, password) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = compareToken(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const payload = {
    user: {
      id: user._id
    }
  };
  const token = generateToken(payload);
  return token;
};

export { encryptPassword, compareToken, verifyToken, generateToken, login };
