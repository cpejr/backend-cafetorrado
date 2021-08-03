const ThemeModel = require('../Models/ThemeModel');

module.exports = {

  async get(req, res) {
    try {
      console.log('oi');
      const result = await ThemeModel.get();
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on getting the last Theme:\n${err}`);
      return res.status(500).json({
        error: 'Failed to get last Theme',
      });
    }
  },

  async updateLastTheme(req, res) {
    try {
      const themeName = req.body;
      const result = await ThemeModel.update(themeName);
      return res.status(200).json(result);
    } catch (err) {
      console.warn(`There has been an error on updating the last Theme:\n${err}`);
      return res.status(500).json({
        error: 'Failed to update last Theme',
      });
    }
  },
};
