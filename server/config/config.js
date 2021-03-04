export default {
  port: process.env.PORT || 1234,
  ip: process.env.HOST || '0.0.0.0',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/movierama'
  },
  jwtSecret: process.env.JWT_SECRET || 'p@£%Tg#@!S56ds'
};
