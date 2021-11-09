const connection = require('../database/connection');

module.exports = {
  async get() {
    const result = await connection('themes')
      .select('*').first();
    if (!result) {
      await connection('themes').insert({
        theme_id: 1,
        lastTheme: 'technologic',
      });
      return {
        theme_id: 1,
        lastTheme: 'technologic',
      };
    }
    return result;
  },

  async update(lastTheme) {
    const result = await connection('themes')
      .where({ theme_id: 1 }).update(lastTheme);
    return result;
  },
};
