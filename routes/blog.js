const { Router } = require("express");
const router = Router();

const Blog = require("../models/blogs");
const Comment = require("../models/comment");

// 🔁 Cloudinary-based file upload setup
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "scribbly_uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// 📄 Render the "Add New Blog" page
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

// 📄 View a specific blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

// 📝 Create a new blog post with image upload
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blogData = {
    title,
    body,
    createdBy: req.user._id,
  };

  if (req.file && req.file.path) {
    blogData.coverImageURL = req.file.path; // Cloudinary image URL
  }

  const blog = await Blog.create(blogData);
  return res.redirect(`/blog/${blog._id}`);
});

// 💬 Add a comment to a blog post
router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
