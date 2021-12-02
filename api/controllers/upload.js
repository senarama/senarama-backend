const { request, response } = require('express');
const { v4: uuid } = require('uuid');
const { UPLOAD_USER } = require('../config/common');
const logError = require('../helpers/error-format');

const getSaveInfo = (reqPath, uid) => {
  const data = {};

  if (reqPath.search(/document/) !== -1) {
    data.path = UPLOAD_USER.DOCUMENT;
    data.type = 'document';
  } else if (reqPath.search(/user\/image/) !== -1) {
    data.path = UPLOAD_USER.PICTURE;
    data.type = 'image';
  } else if (reqPath.search(/video/) !== -1) {
    data.path = UPLOAD_USER.VIDEO;
    data.type = 'video';
  }

  return data;
};

const getName = (filename = '') => `${uuid()}.${filename.split('.').pop()}`;

const upload = async (req = request, res = response) => {
  const data = getSaveInfo(req.path, req.userInfo.uid);
  data.name = getName(req.files[data.type].name);
  try {
    req.files[data.type].mv(`${data.path}/${data.name}`, logError);
  } catch (error) {
    logError(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
    });
  }
};

const getFile = (req = request, res = response) => {
  const userType = req.userInfo.admin ? true : req.userInfo.same;
  if (userType) {
    res.sendFile(`.${req.path}`, { root: '.' });
  } else {
    return res.status(403).json({
      ok: false,
      msg: 'No tiene acceso a este archivo',
    });
  }
};

module.exports = { upload, getFile };
