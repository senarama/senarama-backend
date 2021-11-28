const { connect } = require('mongoose');
const { DB_HOST } = require('./common');

const connectDB = async () => {
  try {
    await connect(DB_HOST, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
