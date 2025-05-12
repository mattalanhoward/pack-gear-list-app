import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import GearItem from './models/GearItem.js';

dotenv.config();
connectDB();

const seedAdmin = async () => {
  const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    await User.create({
      email: process.env.ADMIN_EMAIL,
      trailname: process.env.ADMIN_TRAILNAME,
      passwordHash,
      role: 'admin',
    });
    console.log('Admin user seeded');
  } else {
    console.log('Admin user already exists');
  }
};

const seedGearItems = async () => {
  const count = await GearItem.countDocuments();
  if (count === 0) {
    const dummyItems = [
      { category: 'Clothing', name: 'Merino Wool Socks', brand: 'Darn Tough',description: 'Breathable hiking socks', weight: 100, price: 25.0, link: '', worn: false, consumable: false, quantity: 1 },
      { category: 'Footwear', name: 'Hiking Boots', brand: 'La Sportiva',description: 'Waterproof boots', weight: 1200, price: 150.0, link: '', worn: true, consumable: false, quantity: 1 },
      { category: 'Shelter', name: 'Ultralight Tent', brand: 'Tarptent',description: 'Two-person tent', weight: 1500, price: 350.0, link: '', worn: false, consumable: false, quantity: 1 },
      { category: 'Kitchen', name: 'Camping Stove', brand: 'SnowPeak',description: 'Portable gas stove', weight: 300, price: 60.0, link: '', worn: false, consumable: false, quantity: 1 },
      { category: 'First aid', name: 'First Aid Kit',brand: 'Smartwool', description: 'Standard kit', weight: 200, price: 30.0, link: '', worn: false, consumable: false, quantity: 1 },
      { category: 'Clothing', name: 'Merino Wool Socks', brand: 'Smartwool', description: 'Midweight wool socks', weight: 100, price: 30.0, link: '', worn: true, consumable: false, quantity: 1},
      { category: 'Footwear', name: 'Hiking Boots',   brand: 'Salomon',   description: 'leather hiking boots', weight: 1200,  price: 30.0, link: '', worn: false, consumable: false, quantity: 1},
    ];
    await GearItem.insertMany(dummyItems);
    console.log('Dummy gear items seeded');
  } else {
    console.log('Gear items already exist');
  }
};

const runSeeder = async () => {
  await seedAdmin();
  await seedGearItems();
  mongoose.disconnect();
};

runSeeder();