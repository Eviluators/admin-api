import { resolveMx } from 'dns';

const Airtable = require('airtable');
const { sendUserError } = require('enmapi/common/errors');
const apiKey = process.env.AIRTABLE_API_KEY;
const root = process.env.AIRTABLE_ROOT;

const Student = new Airtable({ apiKey }).base(root)('Students');
const Test_Result = new Airtable({ apiKey }).base(root)('Test Results');

module.exports = {
  getTestResults: async (req, res) => {
    try {
      const testResults = Test_Result.select();
      const results = await testResults.firstPage();
      const resData = results.map(tr => tr.fields);
      res.json(resData);
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
