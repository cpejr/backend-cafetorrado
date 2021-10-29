/* eslint-disable */
const { v4: uuidv4 } = require('uuid');
const connection = require('../database/connection');

module.exports = {
  async create(mark, roast_id) {
    const mark_id = uuidv4();
      mark.mark_id = mark_id;
      mark.roast_id = roast_id;
    const result = await connection('mark').insert(mark);
    return result;
  },
};
