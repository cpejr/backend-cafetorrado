const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const connection = require('../database/connection');

const timestamp = Date.now();
const tempData = [];
for (let i = 0; i < 5000; i++) {
  tempData.push(Math.random().toFixed(2));
}
module.exports = {
  async create(roast) {
    roast.roast_id = uuidv4();
    roast.timestamp = timestamp;
    fs.mkdir(path.join('src/RoastArchive', `${roast.name}`), 0777 ,(err) => {
      if (err) throw err;
      fs.appendFile(path.join(`src/RoastArchive/${roast.name}`, `${roast.roast_id}`), `${tempData}`, (err) => {
        if (err) throw err;
      });
    });
    
    const result = await connection('roast').insert(roast);
    return result;
  },

  async get() {
    const result = await connection('roast')
      .select('*');
    return result;
  },

  async createTxt(roast_id, txtRoast) {
    fs.appendFile((path.join(__dirname), 'buttonData.txt'), `${data},`, (err) => {
      if (err) throw err;
    });
    console.log(txtRoast);
    const result = await connection('roast')
      .where('archive_id')
      .insert(txtRoast);
    return result;
  },
};
