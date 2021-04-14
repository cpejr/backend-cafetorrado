const fs = require('fs');
const { performance } = require('perf_hooks');
const getFileData = require('../Socket/Data');
const { ReadBinary } = require('../Structs/readBinary');
const roastModel = require('../Models/RoastModel');

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
    try {
      const { roast_id } = req.params;
      const { name, description } = await roastModel.getRoastByID(roast_id);
      const binary = await getFileData(roast_id);
      const data = await ReadBinary(binary);
      console.log(t1 - t0);
      return res.status(200).json({
        name,
        description,
        status: 'send',
        data,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: 'ERRO', err });
    }
  },
};
