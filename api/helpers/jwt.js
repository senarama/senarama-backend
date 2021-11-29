const jwt = require('jsonwebtoken');
const { PUB_KEY, PRIV_KEY } = require('../config/common');
const logError = require('./error-format');
const isEmpty = require('./is-empty');

const generateToken = async ({ id, role, userName }) => {
  const payload = { uid: id, userName, role };
  try {
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

const verifyToken = async (token) => {
  if (isEmpty(token)) return false;
  try {
    const payload = jwt.verify(token, PUB_KEY, { algorithms: 'RS256' });
    if (isEmpty(payload)) {
      return false;
    }
    return payload;
  } catch (error) {
    logError(error);
    return false;
  }
};

module.exports = { generateToken, verifyToken };
