import express from 'express';
import {
  createGearItem,
  getGearItems,
  deleteGearItem,
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/gearController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

// Gear items (admin)
router.route('/items')
  .get(getGearItems)
  .post(protect, admin, createGearItem);
router.route('/items/:id').delete(protect, admin, deleteGearItem);

// Trips (user)
router.route('/trips')
  .get(protect, getTrips)
  .post(protect, createTrip);
router.route('/trips/:id')
  .get(protect, getTrip)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

export default router;