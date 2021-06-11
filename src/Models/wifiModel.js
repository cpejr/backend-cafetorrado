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
      const name = await connection('wifi').insert(JSON.stringify(name)).where('name');
      return name;
    } catch (err) {
      console.error(err);
    }
  },
};
