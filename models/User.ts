// models/User.ts
import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid overwrite errors in dev
const User = models.User || model('User', UserSchema);

export default User;
