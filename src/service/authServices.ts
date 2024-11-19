import { DocumentDefinition } from 'mongoose';
import UserModel, { I_UserDocument } from '../models/user.model';

export async function register(user: DocumentDefinition<I_UserDocument>): Promise<void> {
  await UserModel.create(user);
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
  await UserModel.findOne({ name: user.name, password: user.password });
}
