const { ReadBinary } = require('../Structs/readBinary');
const { io } = require('./Assets');

const SendStaticData = async (data) => {
  const sendVec = ReadBinary(data);
  io.emit('ChartData', sendVec);
};

module.exports = { SendStaticData };
