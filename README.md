# ✍️ Scribbly – Blogging Platform

**Scribbly** is a full-stack blog application where users can create, manage, and share their thoughts. With a clean EJS-based UI, JWT authentication, and MongoDB integration, it offers a simple yet powerful personal publishing experience.

## ✨ Features

📝 **Blog CRUD** – Users can create, view, edit, and delete their blog posts  
👤 **User Authentication** – Secure login and signup using JWT and cookies  
📁 **File Upload Support** – Upload and attach files to blog posts using Multer  
🏠 **Personal Dashboard** – Manage all posts from a personalized user portal  
🎨 **Server-Rendered UI** – EJS templates provide a fast and clean user interface  
🌍 **Environment Config Support** – Easily manage secrets and configs via `.env`  

## 🛠️ Tech Stack

| Layer        | Technologies Used                           |
|--------------|---------------------------------------------|
| 🖥️ Frontend   | EJS, CSS3, Bootstrap                        |
| 🔙 Backend    | Node.js, Express.js                         |
| 🗄️ Database   | MongoDB, Mongoose                           |
| 🔐 Auth       | JSON Web Tokens (JWT), Cookie-Parser        |
| 📤 Uploads    | Multer                                      |
| ⚙️ Dev Tools  | Nodemon, dotenv                             |

## 🔗 Deployment

🌐 **Live Site**: [Scribbly](https://scribbly-qw4o.onrender.com)

## 📂 Project Structure


## 📦 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/manikiran993/scribbly.git
   cd scribbly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. Start the app:
   ```bash
   npm start
   ```

5. Visit: `http://localhost:3000`


## 📄 License

This project is licensed under the ISC License.
