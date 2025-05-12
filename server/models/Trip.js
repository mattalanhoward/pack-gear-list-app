import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  gearList: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'GearItem' },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;