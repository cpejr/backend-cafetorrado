/* eslint-disable */
const MarkModel = require('../Models/MarkModel');

module.exports = {
    async create(req, res) {
        try {
        const Mark = req.body;
        const { roast_id } = req.params;
        console.log(Mark, roast_id);
        result = await MarkModel.create(Mark, roast_id);
          return res.status(200).json(result);
        } catch (err) {
          console.warn(`There has been an error while saving the mark name:\n${err}`);
          return res.status(500).json({
            error: 'Failed to create Roast',
          });
        }
    },

};
