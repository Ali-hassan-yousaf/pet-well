import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define the Worker schema with description and timeOfPost
const workerSchema = new mongoose.Schema({
  shopname: { type: String, required: true },
  name: { type: String, required: true },
  slot: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
  timeOfPost: { type: Date, default: Date.now },
});

const Worker = mongoose.model("Worker", workerSchema);

// Get all workers (filter by shopname if provided)
router.get("/", async (req, res) => {
  const { shopname } = req.query;
  try {
    const filter = shopname ? { shopname } : {};
    const workers = await Worker.find(filter);
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new worker with shopname
router.post("/", async (req, res) => {
  const { shopname, name, slot, date, description, timeOfPost } = req.body;

  try {
    const existingSlot = await Worker.findOne({ shopname, date, slot });

    if (existingSlot) {
      return res
        .status(400)
        .json({ message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` });
    }

    const newWorker = new Worker({
      shopname,
      name,
      slot,
      date,
      description,
      timeOfPost,
    });

    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a worker's slot
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { shopname, name, slot, date, description, timeOfPost } = req.body;

  try {
    const existingSlot = await Worker.findOne({
      shopname,
      date,
      slot,
      _id: { $ne: id },
    });

    if (existingSlot) {
      return res
        .status(400)
        .json({ message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` });
    }

    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { shopname, name, slot, date, description, timeOfPost },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get available slots for a specific shop on a specific date
router.get("/:shopname/slots", async (req, res) => {
  const { shopname } = req.params;
  const { date } = req.query;

  try {
    const allSlots = ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm"];
    const bookedSlots = await Worker.find({ shopname, date }).select("slot -_id");
    const bookedSlotList = bookedSlots.map((s) => s.slot);
    const availableSlots = allSlots.filter((slot) => !bookedSlotList.includes(slot));

    res.status(200).json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a worker
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorker = await Worker.findByIdAndDelete(id);

    if (!deletedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
