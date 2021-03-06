const { readFileSync } = require('fs');

const ROOT = '.';

const { DB_HOST } = process.env;
const { PORT } = process.env;

const PRIV_KEY = readFileSync(`${ROOT}/keys/secret-key.key`);
const PUB_KEY = readFileSync(`${ROOT}/keys/secret-key.pub`);

module.exports = {
  DB_HOST,
  PORT,
  PRIV_KEY,
  PUB_KEY,
};
