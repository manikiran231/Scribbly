# ✍️ Scribbly – Blogging Platform

**Scribbly** is a full-stack blog application where users can create, manage, and share their thoughts. With a clean EJS-based UI, JWT authentication, and MongoDB integration, it offers a simple yet powerful personal publishing experience — now with **image uploads via Cloudinary**, **responsive design**, and a **dark/light mode toggle**.

---

## ✨ Features

- 📝 **Blog CRUD** – Create, view, edit, and delete blog posts  
- 👤 **User Authentication** – Secure login and signup with JWT and cookies  
- 🌄 **Image Upload Support** – Upload and attach images to blog posts via **Cloudinary**  
- 🏠 **Personal Dashboard** – Manage your posts from a personalized user portal  
- 🎨 **Server-Rendered UI** – Built with clean, fast EJS templates  
- 🌗 **Dark/Light Mode Toggle** – Switch between themes for optimal readability  
- 📱 **Responsive Design** – Fully optimized for mobile, tablet, and desktop views  
- 🌍 **Environment Config** – Easily manage secrets and configs via `.env`  

---

## 🛠️ Tech Stack

| Layer        | Technologies Used                            |
|--------------|----------------------------------------------|
| 🖥️ Frontend   | EJS, CSS3, Bootstrap            |
| 🔙 Backend    | Node.js, Express.js                          |
| 🗄️ Database   | MongoDB, Mongoose                            |
| 🔐 Auth       | JSON Web Tokens (JWT), Cookie-Parser         |
| 📤 Uploads    | Multer, **Cloudinary**                       |
| 💡 Themes     | Dark/Light mode toggle using custom CSS/JS   |
| ⚙️ Dev Tools  | Nodemon, dotenv                              |

---

## 🔗 Deployment

🌐 **Live Site**: [Scribbly](https://scribbly-qw4o.onrender.com)

---

## 📦 Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/manikiran993/scribbly.git
   cd scribbly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables in a `.env` file:**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the app:**
   ```bash
   npm start
   ```

5. **Visit:**  
   `http://localhost:3000`

## 📄 License

This project is licensed under the ISC License.
