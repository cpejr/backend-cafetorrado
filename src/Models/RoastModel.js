const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const connection = require('../database/connection');

const timestamp = Date.now();

module.exports = {
  async create(roast) {
    roast.roast_id = uuidv4();
    roast.timestamp = timestamp;
    fs.rename('src/RoastArchive/TEMPORARY', `src/RoastArchive/${roast.roast_id}`, (err) => {
      if (err) throw err;
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
  async getRoastID(name) {
    const result = await connection.select('roast_id').from('roast').where({ name });
    return result;
  },
};
