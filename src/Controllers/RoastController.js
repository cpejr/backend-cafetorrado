const fs = require('fs');
const roastModel = require('../Models/RoastModel');
const { updateStructCommands } = require('../Structs/toStruct_cmdData');

module.exports = {
  async create(req, res) {
    try {
      const Roast = req.body;
      const result = await roastModel.create(Roast);
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

  async deleteLast(req, res) {
    fs.rmdir('src/RoastArchive/TEMPORARY', { recursive: true }, (err) => { if (err) throw err; });
    return res.status(200).json({ message: 'Roast sucessfully Deleted' });
  },

  async getUniqueRoastData(req, res) {
    try {
      // eslint-disable-next-line
      const { roast_id } = req.params;
      // eslint-disable-next-line
      const data = require(`../RoastArchive/${roast_id}/ParsedData.json`);
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'ERRO', err });
    }
  },
  async bounceToUpdate(req, res) {
    try {
      updateStructCommands(req.body);
      return res.status(200).json({ Message: 'Sucessfully changed params' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'There has been an error on the update' });
    }
  },
};