const connection = require('../database/connection');

module.exports = {
  async create(user) {
    try {
      await connection('user').insert(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  async get() {
    const user = await connection('user')
      .select('*')
      .first();

    return user;
  },
};
