const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-covers",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 1000, height: 600, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.user) return next();
  res.redirect("/login");
}

// Dashboard view
router.get("/:id", isAuthenticated, async (req, res) => {
  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).send("Unauthorized");
  }
  try {
    const blogs = await Blog.find({ createdBy: req.params.id });
    res.render("dashboard", { user: req.user, blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
});

// Edit blog (POST)
router.post("/edit/:id", isAuthenticated, upload.single("coverImageURL"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    if (req.body.title) blog.title = req.body.title;
    if (req.body.content) blog.body = req.body.content;
    if (req.file) blog.coverImageURL = req.file.path; // Cloudinary secure URL

    await blog.save();
    res.redirect(`/dashboard/${req.user._id}`);
  } catch (err) {
    console.error("Edit error:", err);
    res.status(500).send("Something went wrong");
  }
});

// Delete blog
router.get("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    await blog.deleteOne();
    res.redirect(`/dashboard/${req.user._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Render edit blog form
router.get("/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }
    res.render("editBlog", { blog });
  } catch (err) {
    console.error("Error loading edit page:", err);
    res.status(500).send("Error loading edit form");
  }
});

module.exports = router;
