// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a Auth item using TypeScript interfaces
export interface Auth {
  email: string;
  password: string;
}

// Merging IAuth interface with mongoose's Document interface to create 
// a new interface that represents a Auth document in MongoDB
export interface AuthInterface extends Auth, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the Auth document, specifying the types 
// and constraints
const authSchema = new mongoose.Schema<AuthInterface>(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      unique:true
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the Auth document
const Auth: Model<AuthInterface> =
  mongoose.models?.Auth || mongoose.model("Auth", authSchema);

export default Auth;