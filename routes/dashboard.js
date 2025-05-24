const express = require("express");
const router = express.Router();
const multer=require("multer")
const Blog = require("../models/blogs");
const path=require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!req.user || !req.user._id) {
            return cb(new Error("User not authenticated"), null);
        }
        const uploadPath = path.resolve(`./public/uploads/`);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

function isAuthenticated(req, res, next) {
    if (req.user) return next();
    res.redirect("/login");
}

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

router.post("/edit/:id",isAuthenticated,upload.single("coverImageURL"),async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog || blog.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
      }
      if(req.body.title) blog.title = req.body.title;
      if(req.body.content) blog.body = req.body.content;
      if(req.file) blog.coverImageURL = `/uploads/${req.file.filename}`;
      await blog.save();
      res.redirect(`/dashboard/${req.user._id}`);
    } catch (err) {
      console.error("Edit error:", err);
      res.status(500).send("Something went wrong");
    }
  }
);

router.get("/delete/:id", isAuthenticated, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized");
        }

        await blog.deleteOne(); // or blog.remove()
        res.redirect(`/dashboard/${req.user._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

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