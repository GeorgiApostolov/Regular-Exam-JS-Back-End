import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const mythSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    origin: {
      type: String,
      required: [true, "Origin is required!"],
    },
    role: {
      type: String,
      required: [true, "Role is required!"],
    },
    image: {
      type: String,
      required: [true, "Image is required!"],
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required!"],
    },
    era: {
      type: String,
      required: [true, "Era is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    likedList: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Myth = model("Myth", mythSchema);

export default Myth;
