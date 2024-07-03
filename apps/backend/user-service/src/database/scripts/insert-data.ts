import UserModel from '@/src/database/models/user.model';
import configs from '@/src/utils/config';
import mongoose from 'mongoose';


// Sample user data
const users = [
  { username: 'johndoe', email: 'john.doe@example.com', gender: 'Male', age: 28 },
  { username: 'janedoe', email: 'jane.doe@example.com', gender: 'Female', age: 25 },
  { username: 'alicejones', email: 'alice.jones@example.com', gender: 'Female', age: 34 },
  { username: 'bobsmith', email: 'bob.smith@example.com', gender: 'Male', age: 45 },
  { username: 'charlieday', email: 'charlie.day@example.com', gender: 'Non-binary', age: 29 },
  { username: 'dianaross', email: 'diana.ross@example.com', gender: 'Female', age: 39 },
  { username: 'evanwall', email: 'evan.wall@example.com', gender: 'Male', age: 22 },
  { username: 'fionagray', email: 'fiona.gray@example.com', gender: 'Female', age: 31 },
  { username: 'gregchapel', email: 'greg.chapel@example.com', gender: 'Male', age: 36 },
  { username: 'hannahmontana', email: 'hannah.montana@example.com', gender: 'Female', age: 24 },
  { username: 'ianvince', email: 'ian.vince@example.com', gender: 'Male', age: 41 },
  { username: 'juliaeve', email: 'julia.eve@example.com', gender: 'Female', age: 27 },
  { username: 'kylemoose', email: 'kyle.moose@example.com', gender: 'Male', age: 19 },
  { username: 'lucypinder', email: 'lucy.pinder@example.com', gender: 'Female', age: 30 },
  { username: 'mikenorton', email: 'mike.norton@example.com', gender: 'Male', age: 33 },
  { username: 'nancywheeler', email: 'nancy.wheeler@example.com', gender: 'Female', age: 35 },
  { username: 'oscarwild', email: 'oscar.wild@example.com', gender: 'Male', age: 40 },
  { username: 'pennywise', email: 'penny.wise@example.com', gender: 'Non-binary', age: 37 },
  { username: 'quincyadams', email: 'quincy.adams@example.com', gender: 'Male', age: 21 },
  { username: 'rachelgreen', email: 'rachel.green@example.com', gender: 'Female', age: 26 }
];

// Function to connect to the database and insert data
const insertData = async () => {
  try {
    await mongoose.connect(configs.mongodbUrl);
    console.log('Connected to MongoDB.');
    const inserted = await UserModel.create(users);
    console.log('Data inserted:', inserted);
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

insertData();
