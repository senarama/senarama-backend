const bcryptjs = require('bcryptjs');

const matchPasswd = async (password, hash) => {
  try {
    const match = await bcryptjs.compare(password, hash);
    return match;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const hashPasswd = async (password) => {
  try {
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = { matchPasswd, hashPasswd };
