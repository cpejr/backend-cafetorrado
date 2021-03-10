const fs = require('fs');
const path = require('path');
const roastModel = require('../Models/RoastModel');

let TEMPDATA = [];
module.exports = {
  async createTxt(req, res) {
    fs.readFile((path.join(__dirname), 'src/TxtFiles/buttonData.txt'), 'utf8', (err, data) => {
      if (err) { throw err; } else {
        TEMPDATA = data;
        TEMPDATA.split('\n');
        console.log(TEMPDATA);
      }
    });

    try {
      const result = await roastModel.createTxt(TEMPDATA);
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on the creation of txt file of the roast:\n${err}`);
      return res.status(500).json({
        error: 'Failed to create txt Roast',
      });
    }
  },
};
