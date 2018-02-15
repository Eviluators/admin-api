const { getCurrentUser, postSaveUser } = require('./controllers');
const { authorizeRoute } = require('enmapi/services').Auth;

module.exports = {
  '/user': {
    middleware: authorizeRoute,
    post: {
      '/save': postSaveUser
    },
    get: {
      '/current': getCurrentUser
    }
  }
};
