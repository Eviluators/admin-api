const { getTestResults, getStudentById } = require('./controllers');
const { authorizeRoute } = require('enmapi/services').Auth;

module.exports = {
  '/airtable': {
    middleware: authorizeRoute,
    get: {
      '/test-results': getTestResults,
      '/student:id': getStudentById
    }
  }
};
