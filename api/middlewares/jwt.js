const { verifyToken } = require('../helpers/jwt');

const checkToken = (req, res, next = () => {}) => {
  try {
    const token = req.headers.authorization.replace(/Bearer /g, '');
    const payload = verifyToken(token);
    if (payload) {
      req.userInfo = payload;
      next();
    } else {
      res.status(401).json({
        ok: false,
        msg: 'Token is not valid',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'No token in headers',
    });
  }
};

module.exports = checkToken;
