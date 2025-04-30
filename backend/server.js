

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
//     "https://pet-well-6436.vercel.app"
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





import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import barberRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import workerRouter from "./routes/workerRoute.js";
import mongoose from "mongoose"; // Add mongoose import

const app = express();
const port = process.env.PORT;

// Add Item Schema and Model (CRUD operations)
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// CRUD Routes (Add these before default route)
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All original code below remains unchanged
const corsOptions = {
  origin: [
    "https://pet-well-6436.vercel.app"
  ],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

const connectServices = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log("Connected to MongoDB and Cloudinary successfully");
  } catch (error) {
    console.error("Error connecting to services:", error);
    process.exit(1);
  }
};

connectServices();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", barberRouter); 
app.use("/api/worker", workerRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});
