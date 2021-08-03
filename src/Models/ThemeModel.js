const connection = require('../database/connection');

module.exports = {
  async get() {
    const result = await connection('themes')
      .select('*').first();
    return result;
  },

  async update(lastTheme) {
    const result = await connection('themes')
      .update({ lastTheme }).first();
    return result;
  },
};
