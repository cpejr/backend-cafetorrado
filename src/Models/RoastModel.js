const connection = require('../database/connection');

module.exports = {
  async create(roast) {
    const result = await connection('roast').insert(roast);
    return result;
  },
  async get() {
    const result = await connection('roast')
      .select('*');
    return result;
  },
  async updateById(roast_id) {
    const result = await connection('roast')
      .where({ roast_id })
      .select('*');
    return result;
  },
  async deleteById(roast_id) {
    const result = await connection('roast')
      .where({ roast_id })
      .delete();
    return result;
  },
};
