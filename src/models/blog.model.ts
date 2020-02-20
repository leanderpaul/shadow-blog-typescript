import { Document, Schema, model } from 'mongoose';

/**
 * Interface for the blog document.
 */
export interface IBlog extends Document {
  author: string;
  name: string;
  headerImg: string;
  content: string;
}

/**
 * The schema creation for the blog document.
 */
const blogSchema: Schema = new Schema({
  author: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  headerImg: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

/**
 * Exporting the blog model.
 */
export default model<IBlog>('blogs', blogSchema);
