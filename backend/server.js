require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cloudinary = require('./config/cloudinary');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const pyqRoutes = require('./routes/pyqRoutes');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Connect to database Let's wrap in async IIFE or simply call it
connectDB().then(async () => {
    try {
        const Admin = require('./models/Admin');
        const adminExists = await Admin.findOne({ email: 'admin@dpclasses.com' });
        if (!adminExists) {
            console.log('Admin account not found. Auto-seeding...');
            const seedAdmin = require('./seedAdmin');
            await seedAdmin();
        }
    } catch (err) {
        console.error('Failed to auto-seed admin on server startup:', err.message);
    }
});

// Configure Cloudinary


const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json()); // Parses JSON incoming payloads
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/pyq', pyqRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('DP Coaching Center API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[Global Error Handler]:', err.message);
    res.status(err.status || 400).json({
        message: err.message || 'An unexpected error occurred',
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
