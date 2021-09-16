const { v4: uuidv4 } = require('uuid');
const connection = require('../database/connection');

module.exports = {
  async create(mark, roast_id) {
    mark.mark_id = uuidv4();
    const result = await connection('mark').where({ roast_id }).insert(mark);
    return result;
  },
};
