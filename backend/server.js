

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



import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import barberRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import workerRouter from "./routes/workerRoute.js";


const app = express();
const port = process.env.PORT || 5000;

// In-memory storage for demonstration
let items = [];

// // Allowing multiple origins in CORS configuration
const corsOptions = {
  origin: [
    "https://5175-idx-hhhh-1745874672220.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev",
    "https://5174-idx-hhhh-1745874672220.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev",
    "https://5173-idx-hhhh-1745874672220.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev",  
    "https://pet-7rbg.vercel.app",

  ],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};




// Connect to MongoDB and Cloudinary with error handling
const connectServices = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log("Connected to MongoDB and Cloudinary successfully");
  } catch (error) {
    console.error("Error connecting to services:", error);
    process.exit(1); // Exit the process if connections fail
  }
};

connectServices();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS middleware with multiple origins

// API Endpoints
app.use("/api/user", userRouter); // User routes
app.use("/api/admin", adminRouter); // Admin routes
app.use("/api/doctor", barberRouter); 
app.use("/api/worker", workerRouter); // Worker routes



// app.use('/api', apiRoutes);


// Items routes
app.post("/api/items", (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newItem = { title, description };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/items", (req, res) => {
  res.json(items);
});

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});
