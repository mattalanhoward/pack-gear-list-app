import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const seedAdmin = async () => {
  const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (exists) {
    console.log('Admin user already exists');
    process.exit();
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
  await User.create({
    email: process.env.ADMIN_EMAIL,
    trailname: process.env.ADMIN_TRAILNAME,
    passwordHash,
    role: 'admin',
  });
  console.log('Admin user seeded');
  process.exit();
};

seedAdmin();