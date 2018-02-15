const { getTestResults } = require('./controllers');
const { authorizeRoute } = require('enmapi/services').Auth;

module.exports = {
  '/airtable': {
    // middleware: authorizeRoute,
    get: {
      '/test-results': getTestResults
    }
  }
};
