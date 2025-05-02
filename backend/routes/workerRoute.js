// // // import express from "express";
// // // import Worker from "../models/worker.js";

// // // const router = express.Router();

// // // // Get all workers (filter by title if provided)
// // // router.get("/", async (req, res) => {
// // //   const { title } = req.query; // Optional query parameter to filter by title

// // //   try {
// // //     const filter = title ? { title } : {};
// // //     const workers = await Worker.find(filter);
// // //     res.status(200).json(workers);
// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // });

// // // // Add a new worker with title, description, and post date
// // // router.post("/", async (req, res) => {
// // //   const { title, description, postDate } = req.body;

// // //   try {
// // //     const newWorker = new Worker({ title, description, postDate });
// // //     await newWorker.save();
// // //     res.status(201).json(newWorker);
// // //   } catch (error) {
// // //     res.status(400).json({ message: error.message });
// // //   }
// // // });

// // // // Update a worker's title, description, or post date
// // // router.put("/:id", async (req, res) => {
// // //   const { id } = req.params;
// // //   const { title, description, postDate } = req.body;

// // //   try {
// // //     const updatedWorker = await Worker.findByIdAndUpdate(
// // //       id,
// // //       { title, description, postDate },
// // //       { new: true }
// // //     );

// // //     if (!updatedWorker) {
// // //       return res.status(404).json({ message: "Worker not found" });
// // //     }

// // //     res.status(200).json(updatedWorker);
// // //   } catch (error) {
// // //     res.status(400).json({ message: error.message });
// // //   }
// // // });

// // // // Get workers by a specific post date
// // // router.get("/date", async (req, res) => {
// // //   const { postDate } = req.query; // Date passed as a query parameter

// // //   try {
// // //     const workers = await Worker.find({ postDate });
// // //     res.status(200).json(workers);
// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // });

// // // // Delete a worker
// // // router.delete("/:id", async (req, res) => {
// // //   const { id } = req.params;

// // //   try {
// // //     const deletedWorker = await Worker.findByIdAndDelete(id);

// // //     if (!deletedWorker) {
// // //       return res.status(404).json({ message: "Worker not found" });
// // //     }

// // //     res.status(200).json({ message: "Worker deleted successfully" });
// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // });

// // // export default router;



// // // routes/worker.js
// // import express from 'express';
// // import Worker from '../models/worker.js';
// // import upload from '../middleware/multer.js';
// // import cloudinary from '../config/cloudinary.js';
// // import fs from 'fs';

// // const router = express.Router();

// // // Get all workers (filter by shopname if provided)
// // router.get('/', async (req, res) => {
// //   const { shopname } = req.query;

// //   try {
// //     const filter = shopname ? { shopname } : {};
// //     const workers = await Worker.find(filter);
// //     res.status(200).json(workers);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Add a new worker with shopname and image
// // router.post('/', upload.single('image'), async (req, res) => {
// //   const { shopname, name, slot, date, title, description, postDate } = req.body;
// //   let imageUrl = '';

// //   try {
// //     const existingSlot = await Worker.findOne({ shopname, date, slot });

// //     if (existingSlot) {
// //       return res
// //         .status(400)
// //         .json({ message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` });
// //     }

// //     if (req.file) {
// //       const result = await cloudinary.uploader.upload(req.file.path, {
// //         resource_type: 'image',
// //       });
// //       imageUrl = result.secure_url;
// //       fs.unlinkSync(req.file.path); // Remove file from server
// //     }

// //     const newWorker = new Worker({
// //       shopname,
// //       name,
// //       slot,
// //       date,
// //       title,
// //       description,
// //       image: imageUrl,
// //       postDate,
// //     });

// //     await newWorker.save();
// //     res.status(201).json(newWorker);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // Update a worker's slot
// // router.put('/:id', async (req, res) => {
// //   const { id } = req.params;
// //   const { shopname, name, slot, date } = req.body;

// //   try {
// //     const existingSlot = await Worker.findOne({ shopname, date, slot, _id: { $ne: id } });

// //     if (existingSlot) {
// //       return res
// //         .status(400)
// //         .json({ message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` });
// //     }

// //     const updatedWorker = await Worker.findByIdAndUpdate(
// //       id,
// //       { shopname, name, slot, date },
// //       { new: true }
// //     );

// //     if (!updatedWorker) {
// //       return res.status(404).json({ message: 'Worker not found' });
// //     }

// //     res.status(200).json(updatedWorker);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // Get available slots for a specific shop on a specific date
// // router.get('/:shopname/slots', async (req, res) => {
// //   const { shopname } = req.params;
// //   const { date } = req.query;

// //   try {
// //     const allSlots = ['09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm'];

// //     const bookedSlots = await Worker.find({ shopname, date }).select('slot -_id');
// //     const bookedSlotList = bookedSlots.map((s) => s.slot);

// //     const availableSlots = allSlots.filter((slot) => !bookedSlotList.includes(slot));

// //     res.status(200).json({ availableSlots });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Delete a worker
// // router.delete('/:id', async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     const deletedWorker = await Worker.findByIdAndDelete(id);

// //     if (!deletedWorker) {
// //       return res.status(404).json({ message: 'Worker not found' });
// //     }

// //     res.status(200).json({ message: 'Worker deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // export default router;






// // routes/worker.js
// import express from 'express';
// import Worker from '../models/worker.js';
// import upload from '../middleware/multer.js';
// import cloudinary from '../config/cloudinary.js';
// import fs from 'fs';

// const router = express.Router();

// // Get all workers (filter by shopname if provided)
// router.get('/', async (req, res) => {
//   const { shopname } = req.query;

//   try {
//     const filter = shopname ? { shopname } : {};
//     const workers = await Worker.find(filter);
//     res.status(200).json(workers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add a new worker with shopname and image
// router.post('/', upload.single('image'), async (req, res) => {
//   const { shopname, name, slot, date, title, description, postDate } = req.body;
//   let imageUrl = '';

//   try {
//     const existingSlot = await Worker.findOne({ shopname, date, slot });

//     if (existingSlot) {
//       return res
//         .status(400)
//         .json({ message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` });
//     }

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: 'image',
//       });
//       imageUrl = result.secure_url;
//       fs.unlinkSync(req.file.path); // Remove file from server
//     }

//     const newWorker = new Worker({
//       shopname,
//       name,
//       slot,
//       date,
//       title,
//       description,
//       image: imageUrl,
//       postDate,
//     });

//     await newWorker.save();
//     res.status(201).json(newWorker);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a worker's slot
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { shopname, name, slot, date } = req.body;

//   try {
//     const existingSlot = await Worker.findOne({ shopname, date, slot, _id: { $ne: id } });

//     if (existingSlot) {
//       return res
//         .status(400)
//         .json({ message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` });
//     }

//     const updatedWorker = await Worker.findByIdAndUpdate(
//       id,
//       { shopname, name, slot, date },
//       { new: true }
//     );

//     if (!updatedWorker) {
//       return res.status(404).json({ message: 'Worker not found' });
//     }

//     res.status(200).json(updatedWorker);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get available slots for a specific shop on a specific date
// router.get('/:shopname/slots', async (req, res) => {
//   const { shopname } = req.params;
//   const { date } = req.query;

//   try {
//     const allSlots = ['09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm'];

//     const bookedSlots = await Worker.find({ shopname, date }).select('slot -_id');
//     const bookedSlotList = bookedSlots.map((s) => s.slot);

//     const availableSlots = allSlots.filter((slot) => !bookedSlotList.includes(slot));

//     res.status(200).json({ availableSlots });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete a worker
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedWorker = await Worker.findByIdAndDelete(id);

//     if (!deletedWorker) {
//       return res.status(404).json({ message: 'Worker not found' });
//     }

//     res.status(200).json({ message: 'Worker deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;




import express from 'express';
import Worker from '../models/worker.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Get all workers (filter by shopname if provided)
router.get('/', async (req, res) => {
  const { shopname } = req.query;

  try {
    const filter = shopname ? { shopname } : {};
    const workers = await Worker.find(filter);
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new worker with shopname and image
router.post('/', async (req, res) => {
  const { shopname, name, slot, date, title, description, postDate, image } = req.body;

  try {
    // Check for existing slot
    const existingSlot = await Worker.findOne({ shopname, date, slot });

    if (existingSlot) {
      return res.status(400).json({ 
        message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` 
      });
    }

    // Create new worker with Cloudinary URL from client
    const newWorker = new Worker({
      shopname,
      name,
      slot,
      date,
      title,
      description,
      image,
      postDate
    });

    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a worker's slot
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { shopname, name, slot, date } = req.body;

  try {
    const existingSlot = await Worker.findOne({ 
      shopname, 
      date, 
      slot, 
      _id: { $ne: id } 
    });

    if (existingSlot) {
      return res.status(400).json({ 
        message: `Slot ${slot} is already booked on ${date} for shop ${shopname}` 
      });
    }

    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { shopname, name, slot, date },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get available slots for a specific shop on a specific date
router.get('/:shopname/slots', async (req, res) => {
  const { shopname } = req.params;
  const { date } = req.query;

  try {
    const allSlots = ['09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm'];
    const bookedSlots = await Worker.find({ shopname, date }).select('slot -_id');
    const bookedSlotList = bookedSlots.map((s) => s.slot);
    const availableSlots = allSlots.filter((slot) => !bookedSlotList.includes(slot));

    res.status(200).json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a worker
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorker = await Worker.findByIdAndDelete(id);

    if (!deletedWorker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
