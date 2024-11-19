import mongoose from 'mongoose';

export interface IUserDocument extends mongoose.Document {
  name: string;
  password: string;
}

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
});

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
