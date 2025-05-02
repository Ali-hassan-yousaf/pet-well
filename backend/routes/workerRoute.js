import express from "express";
import Worker from "../models/worker.js";

const router = express.Router();

// Get all workers (filter by title if provided)
router.get("/", async (req, res) => {
  const { title } = req.query; // Optional query parameter to filter by title

  try {
    const filter = title ? { title } : {};
    const workers = await Worker.find(filter);
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new worker with title, description, and post date
router.post("/", async (req, res) => {
  const { title, description, postDate } = req.body;

  try {
    const newWorker = new Worker({ title, description, postDate });
    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a worker's title, description, or post date
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, postDate } = req.body;

  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { title, description, postDate },
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

// Get workers by a specific post date
router.get("/date", async (req, res) => {
  const { postDate } = req.query; // Date passed as a query parameter

  try {
    const workers = await Worker.find({ postDate });
    res.status(200).json(workers);
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
