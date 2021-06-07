const connection = require('../database/connection');

module.exports = {
  async getWifiName() {
    try {
      const name = await connection('wifi').select('name');
      return name;
    } catch (err) {
      console.error(err);
    }
  },
  async setWifiName(name) {
    try {
      await connection('wifi').insert(JSON.stringify(name)).where('name');
      return true;
    } catch (err) {
      console.error(err);
    }
  },
};
