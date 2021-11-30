const jwt = require('jsonwebtoken');
const { PUB_KEY, PRIV_KEY } = require('../config/common');
const logError = require('./error-format');
const isEmpty = require('./is-empty');

/**
 * Asynchronous generate a JWT with base user information
 * @param {object} userDocument
 * @returns {string} string token
 */
const generateToken = async ({ id, role, userName }) => {
  // create payload from user info
  const payload = { uid: id, userName, role };
  try {
    // sign the token using RSA key pairs
    const token = jwt.sign(
      payload,
      { key: PRIV_KEY, passphrase: process.env.SECRET },
      { algorithm: 'RS256', expiresIn: role === 'admin' ? '2h' : '5h' },
    );
    return token;
  } catch (error) {
    logError(error);
    throw new Error('Failed to create token');
  }
};

/**
 * Validate token asynchronous
 * @param {string} token Json Web Token
 * @returns true if token is valid, otherwise false
 */
const verifyToken = async (token) => {
  // check content
  if (isEmpty(token)) return false;
  try {
    // get token payload and check content
    const payload = jwt.verify(token, PUB_KEY, { algorithms: 'RS256' });
    if (isEmpty(payload)) {
      return false;
    }
    return payload;
  } catch (error) {
    // token verification fails
    logError(error);
    return false;
  }
};

module.exports = { generateToken, verifyToken };
