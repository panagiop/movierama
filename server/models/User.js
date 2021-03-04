import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index({ email: 1 });

const UserModel = mongoose.model('User', UserSchema);

UserModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

export { UserModel };
