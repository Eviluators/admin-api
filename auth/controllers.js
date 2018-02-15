const { User, Token } = require('enmapi/database');
const { generateUserToken, decode } = require('./utils/jwt');
const { sendUserError, throwError } = require('enmapi/common/errors');
const { requireFields } = require('enmapi/common/validation');
const {
  objectFromExistingFields: existing,
  dbDocumentUpdateFromExistingFields: updateIfExists
} = require('enmapi/common/utils');
const logger = require('enmapi/common/logger');

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { password, firstName, lastName, email } = req.body;
      requireFields({ email, password });
      const newUserFromReq = existing({
        password,
        firstName,
        lastName,
        email
      });
      const user = await new User(newUserFromReq).save();
      const newUserToken = await generateUserToken(user, req);
      const token = await new Token(newUserToken).save();
      user.activeTokens.push(token._id);
      await user.save();
      logger.info(`New User Created: ${user._id}`);
      res.json({ token: token.data });
    } catch (error) {
      sendUserError(error.message, res);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      requireFields({ email, password });
      const user = await User.findOne({ email });
      if (!user) throwError('not a valid email / password combination');
      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch)
        throwError('not a valid email / password combination');
      const token = await new Token(await generateUserToken(user, req)).save();
      user.activeTokens.push(token._id);
      await user.save();
      res.json({ token: token.data });
    } catch (error) {
      sendUserError(error, res);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const updatedUser = await updateIfExists(req.unsafeUser, {
        email,
        password
      }).save();
      res.json(updatedUser);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  logoutUser: async (req, res) => {
    try {
      const token = req.get('Authorization');
      const { _id } = await decode(token);
      const user = await User.findById(_id);
      const tokenRemoved = user.activeTokens.filter(t => t !== token);
      user.activeTokens = tokenRemoved;
      await user.save();
      res.json({ success: 'User successfully logged out' });
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
