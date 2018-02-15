const { User } = require('enmapi/database');
const { decodeToken } = require('enmapi/services').Auth;
const logger = require('enmapi/common/logger');
const { sendUserError, throwError } = require('enmapi/common/errors');
const { requireFields } = require('enmapi/common/validation');
const {
  dbDocumentUpdateFromExistingFields: existing
} = require('enmapi/common/utils');
module.exports = {
  getCurrentUser: async (req, res) => {
    try {
      res.json(req.safeUser);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  postSaveUser: async (req, res) => {
    try {
      const { data } = req.body;
      requireFields({ data });
      req.unsafeUser.data = data;
      await req.unsafeUser.save();
      res.json({ message: 'success' });
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
