const connection = require('../database/connection');
const roastModel = require('../Models/RoastModel');

module.exports = {
  async create(req, res) {
    try {
      const newRoast = req.body;
      const result = await roastModel.create(newRoast);
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on the creation of the roast:\n${err}`);
      return res.status(500).json({
        error: 'Failed to create Roast',
      });
    }
  },

  async get(req, res) {
    try {
      const result = await roastModel.get();
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on the creation of the roast:\n${err}`);
      return res.status(500).json({
        error: 'Failed to get Roasts',
      });
    }
  },
};
