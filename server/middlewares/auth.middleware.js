import { verifyToken } from '../services/auth.service';

export default function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');
  if (!token) {
    const error = new Error('No token found, authorization denied');
    error.statusCode = 401;
    throw error;
  }
  if (token.split(' ')[0] !== 'Bearer') {
    const error = new Error('Invalid access token format');
    error.statusCode = 401;
    throw error;
  }
  try {
    const decoded = verifyToken(token.split(' ')[1]);
    req.user = decoded.user;
    return next();
  } catch (err) {
    return next(err);
  }
}
