const { ReadBinary } = require('../Structs/readBinary');
const { io } = require('./Assets');

const SendStaticData = async (data) => {
  const sendVec = await ReadBinary(data);
  io.emit('ChartData', sendVec);
  return sendVec;
};

module.exports = { SendStaticData };
