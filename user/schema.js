const Types = require('enmapi/database/utils').Types;
module.exports = {
  User: {
    Schema: {
      email: {
        type: String,
        required: true,
        unique: true
      },
      firstName: {
        type: String
      },
      lasName: {
        type: String
      }
    }
  }
};
