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

  async createTxt(txtRoast) {
    console.log(txtRoast);
    const result = await connection('roast')
      .where('arquivo_id')
      .insert(txtRoast);
    return result;
  },
};
