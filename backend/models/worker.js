// models/worker.js
import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  shopname: { type: String, required: true },
  name: { type: String, required: true },
  slot: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  postDate: { type: String },
});

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
