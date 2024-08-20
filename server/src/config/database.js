const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {});
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected.....');
    });
  } catch (err) {
    console.error('MongoDB connection error!!!!:', err);
  }
};

module.exports = {
  connectDB,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
};