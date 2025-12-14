import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Plan", planSchema);
