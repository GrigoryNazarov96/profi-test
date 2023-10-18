import mongoose, { Document } from "mongoose";

export interface IUrlShorten extends Document {
  originalUrl: string;
  shortUrl: string;
}

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
