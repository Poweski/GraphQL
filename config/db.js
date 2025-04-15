const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGO_URI = 'mongodb://localhost:27017/graphql-todo';

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
