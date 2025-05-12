import GearItem from '../models/GearItem.js';
import Trip from '../models/Trip.js';

export const createGearItem = async (req, res) => {
  const item = await GearItem.create(req.body);
  res.status(201).json(item);
};

export const getGearItems = async (req, res) => {
  const items = await GearItem.find();
  res.json(items);
};

export const deleteGearItem = async (req, res) => {
  await GearItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

export const createTrip = async (req, res) => {
  const trip = await Trip.create({ ...req.body, user: req.user._id });
  // return with populated items
  const fullTrip = await Trip.findById(trip._id).populate('gearList.item');
  res.status(201).json(fullTrip);
};

export const getTrips = async (req, res) => {
  const trips = await Trip.find({ user: req.user._id }).populate('gearList.item');
  res.json(trips);
};

export const getTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('gearList.item');
  res.json(trip);
};

export const updateTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  trip.title = req.body.title;
  trip.gearList = req.body.gearList;
  await trip.save();
  // return populated
  const updated = await Trip.findById(req.params.id).populate('gearList.item');
  res.json(updated);
};

export const deleteTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip || trip.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  await trip.remove();
  res.json({ message: 'Deleted' });
};