const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser
} = require('./controllers');
const { authorizeRoute } = require('enmapi/services').Auth;

module.exports = {
  '/auth': {
    post: {
      '/register': registerUser,
      '/update': [authorizeRoute, updateUser],
      '/login': loginUser
    },
    get: {
      '/logout': [authorizeRoute, logoutUser]
    }
  }
};
