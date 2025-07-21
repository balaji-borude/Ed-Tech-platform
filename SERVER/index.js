const express = require("express");
const app = express();
const cookieParser = require('cookie-parser'); 
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Cloudinary 
const { cloudinaryConnect } = require("./config/cloudinary");

// Access dotenv file 
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Database connection 
require("./config/database").connect();

// Middleware (Move these ABOVE routes)
app.use(express.json()); 

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // If using cookies or authenticatio
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
// Cloudinary connection 
cloudinaryConnect();

// Import Routes  
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

// Mount Routes (AFTER middleware)
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and Running"
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
