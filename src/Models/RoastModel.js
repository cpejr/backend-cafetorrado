/* eslint-disable no-param-reassign */
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

    await connection('roast').insert(roast);
    return roast.roast_id;
  },

  async get() {
    const result = await connection('roast')
      .select('*');
    return result;
  },

  async deleteById(roast_id) {
    const result = await connection('roast')
      .where({ roast_id })
      .delete();
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
  async getRoastByID(roast_id) {
    const result = await connection('roast').select('*').where({ roast_id }).first();
    return result;
  },
};
