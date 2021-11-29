const { verifyToken } = require('../helpers/jwt');

const checkToken = async (req, res, next = () => {}) => {
  try {
    const token = req.headers.authorization.replace(/Bearer /g, '');
    const payload = await verifyToken(token);
    if (payload) {
      req.userInfo = payload;
      next();
    } else {
      return res.status(401).json({
        ok: false,
        msg: 'Token is not valid',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'No token in headers',
    });
  }
};

module.exports = checkToken;
