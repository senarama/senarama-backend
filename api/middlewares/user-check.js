const isEmpty = require('../helpers/is-empty');
const User = require('../models/user');

const ROLE = {
  ADMIN: 'admin',
  LEARNER: 'learner',
  INSTRUCTOR: 'instructor',
  EMPLOYEE: 'employee',
};

const compareResource = (res1, res2) => {
  if (!res1) {
    return true;
  }
  return res1 === res2;
};

const checkUser = (userRole = '', userUID = false) => {
  const checkUserOnDB = async (req, res, next) => {
    const { role, uid } = req.userInfo;
    const matchRole = compareResource(userRole, role);
    const matchUID = compareResource(userUID && req.params.id, uid);
    if (!matchUID) {
      res.status(401).json({
        ok: false,
        msg: 'Fallo la verificación de identidad',
        des: 'User uid provided by token not match',
      });
    }
    if (!matchRole) {
      res.status(401).json({
        ok: false,
        msg: 'Fallo la verificación de identidad',
        des: 'User rol provided by token not match',
      });
    }
    if (role === ROLE.ADMIN && matchRole) {
      try {
        const adminDocument = await User.findById(uid);
        if (!isEmpty(adminDocument)) {
          next();
        } else {
          res.status(403).json({
            ok: false,
            msg: 'El token no es valido para este usuario',
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Contact website admin',
          des: error.message,
        });
      }
    } else if (matchRole && matchUID) {
      next();
    }
  };

  return checkUserOnDB;
};

module.exports = { checkUser, ROLE };
