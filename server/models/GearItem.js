import mongoose from 'mongoose';

const gearItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  weight: { type: Number, required: true }, // stored in grams
  price: { type: Number, required: true }, // USD
  link: String,
  worn: { type: Boolean, default: false },
  consumable: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 },
});

const GearItem = mongoose.model('GearItem', gearItemSchema);
export default GearItem;