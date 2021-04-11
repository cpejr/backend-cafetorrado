const fs = require('fs');
const getFileData = require('../Socket/Data');

const roastModel = require('../Models/RoastModel');
const { SendStaticData } = require('../Socket/SendStaticData');

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

  async getUniqueRoast(req, res) {
    const { name } = req.params;
    const roastID = await roastModel.getRoastID(name);
    const binary = await getFileData(roastID);
    const data = await SendStaticData(binary);
    return res.status(200).json({
      roastID,
      name,
      status: 'send',
      data,
    });
  },
};
