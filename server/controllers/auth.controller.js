import { UserModel as User } from '../models/User';
import { login } from '../services/auth.service';

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await login(User, email, password);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export { loginUser };
