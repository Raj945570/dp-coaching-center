require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const seedAdmin = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await connectDB();
        }

        const email = 'admin@dpclasses.com'.trim().toLowerCase();
        const rawPassword = 'Dhanrajadmin@123';

        // Hash password
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            adminExists.password = hashedPassword;
            await adminExists.save();
            console.log('Password updated successfully');
            return;
        }

        // Create Admin
        await Admin.create({
            email,
            password: hashedPassword,
        });

        console.log('Admin created successfully');
    } catch (error) {
        console.error('Error seeding admin', error);
        throw error;
    }
};

if (require.main === module) {
    seedAdmin()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = seedAdmin;
