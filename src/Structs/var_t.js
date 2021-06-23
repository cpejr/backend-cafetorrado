const { Struct } = require('struct');
// AAAAAAAA0000000000000000000000000000000000000000000000000000010101010000BBBBBBBB
// aaaaaaaa0000f042002081457848a149003aa44600000000000000000000010101010000bbbbbbbb
// 000000000000000000000000000000000000000000000000000001010101000000000000
// aaaaaaaa00000000000000000000000000000000000000000000000000000000bbbbbbbb

function create_var_t() {
  const var_t = new Struct()
    .word32Ule('BlkBegVin')
    .floatle('MdlManChr')
    .floatle('MdlManInj')
    .floatle('MdlManCdr')
    .floatle('MdlManCar')
    .word8('MdlExhAcv')
    .word8('MdlMisAcv')
    .word8('MdlIgnAcv')
    .word8('MdlAlmAcv')
    .word8('MdlModReq')
    .word8('VinEndRes_0')
    .word8('VinEndRes_1')
    .word8('VinEndRes_2')
    .word32Ule('BlkEndVin');
  var_t.allocate();
  return var_t;
}

module.exports = { create_var_t };
