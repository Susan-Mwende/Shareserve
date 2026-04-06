import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminUser from '../models/AdminUser.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email: 'admin@shareserve.org' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new AdminUser({
      firstName: 'Susan',
      lastName: 'Nyaga',
      email: 'admin@shareserve.org',
      password: 'admin123', // Change this in production
      role: 'super_admin'
    });

    await admin.save();
    console.log('Admin user created successfully:');
    console.log('Email: admin@shareserve.org');
    console.log('Password: admin123');
    console.log('Please change the password after first login');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();
