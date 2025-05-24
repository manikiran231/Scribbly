const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/user');
const blogRouter=require("./routes/blog")
const { checkForAuthCookie } = require('./middlewares/auth');
const Blog=require("./models/blogs")
require("dotenv").config()
const app = express();
const PORT = process.env.PORT ||8000;

// DB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch(err => console.error("MongoDB connection error", err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")))

// View engine
app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'));

// Static files
app.use(express.static(path.resolve('./public')));


// Routes

app.get('/', async(req, res) => {
  const allBlogs = await Blog.find({});
  const user=req.user;
  res.render('home', 
    {
    user: req.user,
    blogs:allBlogs ,
  });
});
app.use("/user", userRoute);
app.use("/blog",blogRouter)
app.use("/dashboard", require("./routes/dashboard"));
// Start server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
