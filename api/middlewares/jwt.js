const logError = require('../helpers/error-format');
const { verifyToken } = require('../helpers/jwt');

/**
 * Check if JWT is valid or not, and execute next() otherwise
 * returns 401 response code to client
 * @param {request} req http request
 * @param {response} res http response
 * @param {function} next next middleware
 * @returns [401|false]
 */
const checkToken = async (req, res, next = () => {}) => {
  try {
    // get the token from headers
    const token = req.headers.authorization.replace(/Bearer /g, '');
    // verify token
    const payload = await verifyToken(token);
    if (payload) {
      // pass
      req.userInfo = payload;
      next();
    } else {
      // token verification fails
      return res.status(401).json({
        ok: false,
        msg: 'Token is not valid',
      });
    }
  } catch (error) {
    logError(error);
    return res.status(401).json({
      ok: false,
      msg: 'No token in headers',
    });
  }
};

module.exports = checkToken;
