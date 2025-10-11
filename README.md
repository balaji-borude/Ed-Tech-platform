# 🎓 StudyNotion – An EdTech Platform

**StudyNotion** is a full-featured **EdTech platform** built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that empowers instructors to create and manage educational content while enabling students to learn, engage, and rate courses. The platform bridges the gap between learners and educators through a seamless and interactive learning experience.

---

## 🛡️ Badges

[![License](https://img.shields.io/github/license/balaji-borude/Ed-Tech-platform)](https://github.com/balaji-borude/Ed-Tech-platform/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/balaji-borude/Ed-Tech-platform?style=social)](https://github.com/balaji-borude/Ed-Tech-platform/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/balaji-borude/Ed-Tech-platform?style=social)](https://github.com/balaji-borude/Ed-Tech-platform/network/members)
[![GitHub issues](https://img.shields.io/github/issues/balaji-borude/Ed-Tech-platform)](https://github.com/balaji-borude/Ed-Tech-platform/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/balaji-borude/Ed-Tech-platform)](https://github.com/balaji-borude/Ed-Tech-platform/pulls)
[![GitHub last commit](https://img.shields.io/github/last-commit/balaji-borude/Ed-Tech-platform)](https://github.com/balaji-borude/Ed-Tech-platform/commits/main)

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">

---

## 🧩 Tech Stack

**Frontend:** React.js, Redux, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Atlas)  
**Media Management:** Cloudinary  
**Payment Integration:** Razorpay  
**Authentication:** JWT, Bcrypt  
**Deployment:** Vercel (frontend), Render/Railway (backend), MongoDB Atlas (database)

---

## 🚀 Features

### 👨‍🎓 For Students
- Browse and enroll in courses.
- Add courses to **Wishlist** and **Cart**.
- Watch course content including videos and documents.
- Rate and review completed courses.
- Manage personal profile and account settings.

### 👩‍🏫 For Instructors
- Create, update, and delete courses.
- Upload and manage course media content via **Cloudinary**.
- View insights: course performance, engagement metrics, and ratings.
- Manage pricing and course structure.

### 🧑‍💼 For Admin (Future Scope)
- Manage users, instructors, and courses.
- Platform-wide analytics (user growth, revenue, course trends).

---

## 🧠 System Architecture

StudyNotion follows a **client-server architecture**:
- **Frontend (Client):** Built using React.js and communicates with the backend through RESTful APIs.
- **Backend (Server):** Powered by Node.js and Express.js, handling business logic and API endpoints.
- **Database:** MongoDB stores course data, user details, and metadata in a flexible NoSQL schema.

### High-Level Architecture

React (Client)
↕
Express + Node.js (Server)
↕
MongoDB Atlas (Database)
↕
Cloudinary (Media Storage)
↕
Razorpay (Payment Gateway)





---

## 🧱 API Design

The backend follows RESTful API principles using standard HTTP methods with JSON data exchange.

### 🔗 Sample Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/signup` | Register a new user (student/instructor) |
| POST | `/api/auth/login` | Authenticate user and issue JWT |
| POST | `/api/auth/verify-otp` | Verify email OTP |
| GET | `/api/courses` | Get all available courses |
| GET | `/api/courses/:id` | Fetch course details |
| POST | `/api/courses` | Create a new course |
| PUT | `/api/courses/:id` | Update an existing course |
| DELETE | `/api/courses/:id` | Delete a course |
| POST | `/api/courses/:id/rate` | Add rating to a course |

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/balaji-borude/Ed-Tech-platform.git

# Navigate to the project folder
cd Ed-Tech-platform

# Install dependencies for frontend and backend
npm install

# Create an environment file (.env) in the backend folder
# Add required credentials for MongoDB, JWT_SECRET, Cloudinary, Razorpay keys, etc.

# Run the backend
npm run server

# Run the frontend
npm start


| Component | Platform         | Description              |
| --------- | ---------------- | ------------------------ |
| Frontend  | Vercel           | React app hosting        |
| Backend   | Render / Railway | Node.js + Express server |
| Database  | MongoDB Atlas    | Cloud database           |
| Media     | Cloudinary       | Media content management |


🧪 Testing

Testing includes:

Unit and integration tests using Jest and Supertest.

Manual verification for API endpoints, authentication, and payment flow.

| Feature                        | Description                          | Priority    |
| ------------------------------ | ------------------------------------ | ----------- |
| 🎮 Gamification                | Add badges, points, and leaderboards | Medium      |
| 🧭 Personalized Learning Paths | AI-driven course suggestions         | High        |
| 💬 Social Learning             | Discussion forums and peer feedback  | Medium      |
| 📱 Mobile App                  | Cross-platform mobile app            | High        |
| 🤖 ML Recommendations          | Smart course recommendations         | Medium–High |
| 🕶️ AR/VR Integration          | Immersive learning experiences       | Low–Medium  |


📜 License

This project is licensed under the MIT License
.

💡 Author

Balaji Borude
🚀 MERN Stack Developer | Passionate about building scalable EdTech & SaaS applications
🔗 GitHub Profile

❤️ Acknowledgments

Special thanks to CodeHelp and the open-source community for inspiration and guidance during development.



---

✅ **How to use it:**
1. Create a file in your repo root directory: `README.md`  
2. Paste this Markdown content.  
3. Commit and push:
   ```bash
   git add README.md
   git commit -m "Added professional README"
   git push origin main
