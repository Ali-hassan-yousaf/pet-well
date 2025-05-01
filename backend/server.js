import express from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import cloudinary from "cloudinary";

// Hardcoded User model (needed for population)
const userSchema = new mongoose.Schema({
  name: String,
  profilePicture: String
});
const User = mongoose.model("User", userSchema);

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Connect Cloudinary
const connectCloudinary = async () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("✅ Cloudinary Configured");
};

// Initialize App
const app = express();
const port = process.env.PORT || 5000;

// Schemas
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model('Item', itemSchema);

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

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: ["https://pet-well-6436.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
}));

// Connect DBs
const connectServices = async () => {
  await connectDB();
  await connectCloudinary();
};
connectServices();

// ✅ CRUD for Items
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/items", async (_, res) => {
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
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Community Post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, image } = req.body;

    // Use a fixed user (you can replace this later)
    const hardcodedUserId = "662f4c97d8792a640bdfc3cc"; // Replace with valid ObjectId from your DB

    let imageUrl = '';
    if (image) {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'petwell/posts'
      });
      imageUrl = result.secure_url;
    }

    const newPost = new Post({
      title,
      content,
      imageUrl,
      author: hardcodedUserId
    });

    await newPost.save();
    const populatedPost = await Post.findById(newPost._id).populate("author", "name profilePicture");
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/posts", async (_, res) => {
  try {
    const posts = await Post.find({ status: 'approved' })
      .populate("author", "name profilePicture")
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

    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(userId);
    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Root route
app.get("/", (_, res) => {
  res.json({ message: "API Working" });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
