import { UserModel as User } from '../models/User';
import { create } from '../services/users.service';

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const token = await create(User, username, email, password);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

export { createUser };
