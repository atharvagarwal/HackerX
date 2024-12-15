import mongoose, { Document, Model } from "mongoose";

// Define the interface for TypeScript typing
interface IHackathon extends Document {
  date: Date;
  venue: string;
  title: string;
  prizePool: number;
  description: string;
  image: string;
  organizerEmail: string;
  participantIds: mongoose.Types.ObjectId[];
}

// Define the schema
const HackathonSchema = new mongoose.Schema<IHackathon>(
  {
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    prizePool: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    organizerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    participantIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming User model is used for participants
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the model
const Hackathon: Model<IHackathon> =
  mongoose.models?.Hackathon|| mongoose.model("Hackathon", HackathonSchema);

export default Hackathon;
