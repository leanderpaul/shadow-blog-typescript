import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * The interface of the user document.
 */
export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

/**
 * The schema creation for the user document.
 */
const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * Pre save hook to hash the password before saving the user document.
 */
userSchema.pre<IUser>('save', async function(next: CallableFunction) {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

/**
 * A method attached to the user document to compare the password with the hashed value.
 */
userSchema.methods.comparePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

/**
 * Exporting the user model.
 */
export default model<IUser>('users', userSchema);
