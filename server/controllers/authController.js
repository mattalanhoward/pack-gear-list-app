import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  const { email, trailname, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email already in use' });
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await User.create({ email, trailname, passwordHash });
  generateToken(res, user._id);
  res.status(201).json({ id: user._id, email: user.email, trailname: user.trailname });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    return res.json({ id: user._id, email: user.email, trailname: user.trailname });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

export const getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ id: req.user._id, email: req.user.email, trailname: req.user.trailname });
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};