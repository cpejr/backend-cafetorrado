const { v4: uuidv4 } = require('uuid');
const connection = require('../database/connection');

module.exports = {
  async create(user) {
    console.log(user);
    try {
      const user_id = uuidv4();
      user.user_id = user_id;
      await connection('user').insert(user);
      return user_id;
    } catch (error) {
      console.error(error);
    }
  },

  async get(user_id) {
    const result = await connection('user')
      .where({ user_id })
      .select('*');

    return result;
  },
};
