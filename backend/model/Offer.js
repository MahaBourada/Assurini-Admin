import mongoose from "mongoose";
import { Schema } from "mongoose";

const offerSchema = new Schema({
  offerName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  terms: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Offer = mongoose.model("Offer", offerSchema);
export default Offer
