const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);

    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'blog',
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // ⬅️ CRITICAL
  }
};

module.exports = connectDB;
