import { Schema, model } from 'mongoose';

// Interface to describe a single document
export interface IItem {
  name: string;
  category: string;
  price: number;
}

// Schema definition
const itemSchema = new Schema({
  name: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: Number, require: true }
})

// Create a model from the schema
const ItemModel = model<IItem>('Item', itemSchema);

export default ItemModel;
