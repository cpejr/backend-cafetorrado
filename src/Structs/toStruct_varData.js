const { Struct } = require('struct');

function createManualStruct() {
  const variableStruct = new Struct()
    .floatle('MdlManChr')
    .floatle('MdlManInj')
    .floatle('MdlManCdr')
    .floatle('MdlManCar')
    .chars('HnqDbg', 16)
    .word8('MdlTarAcv')
    .word8('MdlTgrAcv')
    .word8('MdlExhAcv')
    .word8('MdlMisAcv')
    .word8('MdlIgnAcv')
    .word8('MdlAlmAcv')
    .word8('MemStrReq')
    .word8('MdlModReq');

  variableStruct.allocate();

  return variableStruct;
}

module.exports = { createManualStruct };
