const bcryptjs = require('bcryptjs');
const logError = require('./error-format');

/**
 * Asynchronous compare if a password match with a hash
 * @param {string} password string password
 * @param {string} hash hashed password string
 * @returns {boolean} true if passwords match otherwise false
 */
const matchPasswd = async (password, hash) => {
  try {
    const match = await bcryptjs.compare(password, hash);
    return match;
  } catch (error) {
    logError(error);
    return false;
  }
};

/**
 * Asynchronous hash a password string
 * @param {string} password string password
 * @returns {string} hashed password string
 */
const hashPasswd = async (password) => {
  try {
    // hash the password and return the result
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  } catch (error) {
    logError(error);
    throw new Error(error.message);
  }
};

module.exports = { matchPasswd, hashPasswd };
