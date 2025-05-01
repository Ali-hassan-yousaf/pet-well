

// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import barberRouter from "./routes/doctorRoute.js";
// import adminRouter from "./routes/adminRoute.js";
// import workerRouter from "./routes/workerRoute.js";


// const app = express();
// const port = process.env.PORT;

// // Allowing multiple origins in CORS configuration
// const corsOptions = {
//   origin: [
//    "https://pet-7rbg.vercel.app",
//     "https://5173-idx-hhhh-1745874672220.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev"
//   ],
//   methods: ["POST", "GET", "PUT", "DELETE"],
//   credentials: true,

// };





// // Connect to MongoDB and Cloudinary with error handling
// const connectServices = async () => {
//   try {
//     await connectDB();
//     await connectCloudinary();
//     console.log("Connected to MongoDB and Cloudinary successfully");
//   } catch (error) {
//     console.error("Error connecting to services:", error);
//     process.exit(1); // Exit the process if connections fail
//   }
// };

// connectServices();

// // Middlewares
// app.use(express.json());
// app.use(cors(corsOptions)); // Apply CORS middleware with multiple origins

// // API Endpoints
// app.use("/api/user", userRouter); // User routes
// app.use("/api/admin", adminRouter); // Admin routes
// app.use("/api/doctor", barberRouter); 
// app.use("/api/worker", workerRouter); // Worker routes




// // Default route
// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server started on PORT:${port}`);
// });



// server/models/Item.js (New file)
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema);

// server/routes/userRoute.js (Modified)
import express from 'express';
import Item from '../models/Item.js'; // Import the new Item model

const router = express.Router();

// Existing user routes (assuming they exist) remain unchanged
// Add new CRUD routes for items under /api/user

// Create a new item
router.post('/items', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const item = new Item({ title, description });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an item
router.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

// server/index.js (Unchanged)
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import barberRouter from './routes/doctorRoute.js';
import adminRouter from './routes/adminRoute.js';
import workerRouter from './routes/workerRoute.js';

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: [
    'https://pet-7rbg.vercel.app',
    'https://5173-idx-hhhh-1745874672220.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev'
  ],
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
};

const connectServices = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log('Connected to MongoDB and Cloudinary successfully');
  } catch (error) {
    console.error('Error connecting to services:', error);
    process.exit(1);
  }
};

connectServices();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', barberRouter);
app.use('/api/worker', workerRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});
