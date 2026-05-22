require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
require("./config/cloudinary");

// Routes
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const pyqRoutes = require("./routes/pyqRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Database Connection
connectDB();

// CORS FIX
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://dp-coaching-center.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/pyq", pyqRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("DP Coaching Center API Running...");
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Server Error",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});