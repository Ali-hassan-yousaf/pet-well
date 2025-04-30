




// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import barberRouter from "./routes/doctorRoute.js";
// import adminRouter from "./routes/adminRoute.js";
// import workerRouter from "./routes/workerRoute.js";
// import mongoose from "mongoose"; // Add mongoose import

// const app = express();
// const port = process.env.PORT;

// // Add Item Schema and Model (CRUD operations)
// const itemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Item = mongoose.model('Item', itemSchema);

// // CRUD Routes (Add these before default route)
// app.post("/api/items", async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.get("/api/items", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get("/api/items/:id", async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.put("/api/items/:id", async (req, res) => {
//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.delete("/api/items/:id", async (req, res) => {
//   try {
//     const deletedItem = await Item.findByIdAndDelete(req.params.id);
//     if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // All original code below remains unchanged
// const corsOptions = {
//   origin: [
//     "https://pet-well-6436.vercel.app"
//   ],
//   methods: ["POST", "GET", "PUT", "DELETE"],
//   credentials: true,
// };

// const connectServices = async () => {
//   try {
//     await connectDB();
//     await connectCloudinary();
//     console.log("Connected to MongoDB and Cloudinary successfully");
//   } catch (error) {
//     console.error("Error connecting to services:", error);
//     process.exit(1);
//   }
// };

// connectServices();

// app.use(express.json());
// app.use(cors(corsOptions));

// app.use("/api/user", userRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", barberRouter); 
// app.use("/api/worker", workerRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

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
import mongoose from "mongoose";
import cloudinary from "cloudinary";

const app = express();
const port = process.env.PORT;

// Item Schema and Model (CRUD operations)
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Post Schema and Model (Community Feature)
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved'], default: 'approved' }
});

const Post = mongoose.model('Post', postSchema);

// CORS Configuration
const corsOptions = {
  origin: ["https://pet-well-6436.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

// Service Connections
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

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(corsOptions));

// Existing CRUD Routes for Items
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

// New Community Post Routes
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    let imageUrl = '';

    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'petwell/posts'
      });
      imageUrl = result.secure_url;
    }

    const newPost = new Post({
      title,
      content,
      imageUrl,
      author
    });

    await newPost.save();
    res.status(201).json(await newPost.populate('author', 'name profilePicture'));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find({ status: 'approved' })
      .populate('author', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/api/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.body.userId;

    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Existing Routes
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
