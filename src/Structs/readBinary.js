const { formatServerData } = require('./toStruct_Data');

function ReadBinary(data) {
  const vec = [];
  const subVec = [];
  const sendVec = [];
  let i = 0;
  vec.push(...data);
  while (vec.length !== 0) {
    subVec[i] = vec.splice(0, 1436);
    i += 1;
  }
  i = 0;
  subVec.forEach((elem) => {
    elem = Buffer(elem);
    sendVec[i] = formatServerData(elem);
    i += 1;
  });
  return sendVec;
}
module.exports = { ReadBinary };
