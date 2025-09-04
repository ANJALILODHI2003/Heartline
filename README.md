# ❤️ HeartLine – Blog Application  

HeartLine is a full-stack **Blog Application** that allows users to create, publish, and manage blogs with images. It is designed to be fast, user-friendly, and scalable.  

---

## 🚀 Tech Stack  
- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MySQL (hosted on Railway)  
- **Image Storage:** Cloudinary  
- **Authentication:** JWT  

---

## 🔑 Features  

### 👤 Authentication  
- User Registration (Username, Email, Password)  
- Login with JWT authentication  
- Logout option to end session  

### ✍️ Create & Publish Blogs  
- Rich text editor for writing blogs  
- Upload images via **Cloudinary**  
- Choose category (Art, Science, Technology, Cinema, Design, Food)  
- Option to save as **Draft** or **Publish**  

### 📰 Blog Feed  
- Homepage shows all published blogs  
- Blogs displayed with title, description, image & category  
- Option to read full article  

### 📄 Single Blog View  
- Full blog content with image, author, and publish date  
- Related posts section (“Other posts you may like”)  
- Edit or Delete blog (for author only)  

### 🖼️ User Features  
- Each blog linked to its creator  
- Users can view, edit, and delete their own posts  
- Secure MySQL database for storing users & blog data  

---

## 🗄️ Database Schema (MySQL)  
- **Users Table** – stores user info (id, username, email, password)  
- **Posts Table** – stores blog posts with references to author  
- **Categories Table** – manages blog categories  

---

## 🌐 Deployment  
- **Frontend:** Vercel / Netlify  
- **Backend + Database:** Railway (MySQL)  
- **Images:** Cloudinary  

---

## 📸 Screenshots  

### 🔑 Authentication  
![Register](screenshots/Register.png)  
![Login](screenshots/login.png)  

### 📰 Blog Feed  
![Blog Feed](screenshots/blog-feed.png)  

### ✍️ Write Blog  
![Write Blog](screenshots/write-blog.png)  

### 📄 Single Blog View  
![Single Blog](screenshots/single-blog.png)  

---

## ⚡ How to Run Locally  

1. Clone the repository  
   ```bash
   git clone <repo-url>
   cd blog-app
