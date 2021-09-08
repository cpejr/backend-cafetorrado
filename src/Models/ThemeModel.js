const connection = require('../database/connection');

module.exports = {
  async get() {
    const result = await connection('themes')
      .select('*').first();
    return result;
  },

  async update(lastTheme) {
    const result = await connection('themes')
      .where({ theme_id: 1 }).update(lastTheme);
    return result;
  },
};
