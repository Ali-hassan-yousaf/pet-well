// models/worker.js
import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  shopname: { type: String, required: false },
  name: { type: String, required: false },
  slot: { type: String, required: false },
  date: { type: String, required: false },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  postDate: { type: String },
});

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
