import { UserModel as User } from '../models/User';
import { get, create } from '../services/users.service';

const getUser = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await get(User, email);
    return res.json({ user });
  } catch (err) {
    return next(err);
  } 
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const token = await create(User, username, email, password);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

export { getUser, createUser };
