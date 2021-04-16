const { Struct } = require('struct');

function createManualStruct() {
  const variableStruct = new Struct()
    .floatle('MdlManChr')
    .floatle('MdlManInj')
    .floatle('MdlManCdr')
    .floatle('MdlManCar')
    .chars('HnqDbg', 24);
  variableStruct.allocate();

  return variableStruct;
}

module.exports = { createManualStruct };
