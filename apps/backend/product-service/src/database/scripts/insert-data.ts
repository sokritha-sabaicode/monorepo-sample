import ItemModel from '@/src/database/models/product.model';
import configs from '@/src/utils/config';
import mongoose from 'mongoose';

// Sample user data
const sampleItems = [
  { name: "Laptop", category: "Electronics", price: 999 },
  { name: "Coffee Maker", category: "Appliances", price: 120 },
  { name: "Desk Chair", category: "Furniture", price: 150 },
  { name: "Basketball", category: "Sports", price: 40 },
  { name: "Bluetooth Headphones", category: "Electronics", price: 200 },
  { name: "Novel", category: "Books", price: 15 },
  { name: "Gaming Mouse", category: "Electronics", price: 50 },
  { name: "Backpack", category: "Accessories", price: 70 },
  { name: "Smartwatch", category: "Electronics", price: 199 },
  { name: "Grill", category: "Outdoor", price: 180 }
];

// Function to connect to the database and insert data
const insertData = async () => {
  try {
    await mongoose.connect(configs.mongodbUrl);
    console.log('Connected to MongoDB.');
    const inserted = await ItemModel.create(sampleItems);
    console.log('Data inserted:', inserted);
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

insertData();
