const { connect } = require('mongoose');
const logError = require('../helpers/error-format');
const { DB_HOST } = require('./common');

const connectDB = async () => {
  try {
    await connect(DB_HOST, { useNewUrlParser: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    logError(error);
  }
};

module.exports = connectDB;
