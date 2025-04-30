import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  shopname: { type: String, required: true },
  name: { type: String, required: true },
  slot: { type: String, required: true }, // e.g., "09:00 am"
  date: { type: String, required: true }, // e.g., "2024-01-16"
});

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;


