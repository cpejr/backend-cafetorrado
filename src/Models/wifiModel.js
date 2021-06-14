const connection = require('../database/connection');

module.exports = {
  async getWifiName() {
    try {
      const name = await connection('wifi').select('name').first();
      return name;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  async setWifiName(newName) {
    try {
      const oldName = await getWifiName();
      const name = await connection('wifi').where({ name: oldName }).update({ name: newName });
      return name;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};
