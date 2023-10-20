import mongoose, { Document } from "mongoose";

export interface IUrlShorten extends Document {
  originalLink: string;
  seq: string;
}

const urlSchema = new mongoose.Schema({
  originalLink: {
    type: String,
    required: true,
  },
  seq: {
    type: String,
    required: true,
    unique: true,
  },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
