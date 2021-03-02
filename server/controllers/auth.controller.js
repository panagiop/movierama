import { UserModel as User } from '../models/User';
import { login } from '../services/auth.service';

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const token = await login(User, username, password);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

export { loginUser };
