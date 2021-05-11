const { Struct } = require('struct');
const { ReadBinary } = require('./parseHex');
// AAAAAAAA0000000000000000000000000000000000000000000000000000010101010000BBBBBBBB
// aaaaaaaa0000f042002081457848a149003aa44600000000000000000000010101010000bbbbbbbb

function createManualStruct() {
  const variableStruct = new Struct()
    .word32Ule('BlkBegVar')
    .floatle('MdlManChr')
    .floatle('MdlManInj')
    .floatle('MdlManCdr')
    .floatle('MdlManCar')
    .chars('HnqDbg', 8)
    .word8('MdlTarAcv')
    .word8('MdlTgrAcv')
    .word8('MdlExhAcv')
    .word8('MdlMisAcv')
    .word8('MdlIgnAcv')
    .word8('MdlAlmAcv')
    .word8('MemStrReq')
    .word8('MdlModReq')
    .word32Ule('BlkEndVar');
  variableStruct.allocate();
  return variableStruct;
}
createManualStruct();
module.exports = { createManualStruct };
