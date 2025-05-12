import GearItem from '../models/GearItem.js';
import Trip from '../models/Trip.js';

// Admin: Create gear item
export const createGearItem = async (req, res) => {
  const item = await GearItem.create(req.body);
  res.status(201).json(item);
};

// User/Admin: Get all gear items
export const getGearItems = async (req, res) => {
  const items = await GearItem.find();
  res.json(items);
};

// User: Create trip
export const createTrip = async (req, res) => {
  const trip = await Trip.create({ ...req.body, user: req.user._id });
  res.status(201).json(trip);
};

// User: Get trips for user
export const getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).populate('gearList.item');
  res.json(trips);
};

// User: Get single trip
export const getTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('gearList.item');
  res.json(trip);
};

// User: Update trip
export const updateTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  trip.title = req.body.title;
  trip.gearList = req.body.gearList;
  const updated = await trip.save();
  res.json(updated);
};

// User/Admin: Delete gear item or trip
export const deleteGearItem = async (req, res) => {
  await GearItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
export const deleteTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  await trip.remove();
  res.json({ message: 'Deleted' });
};