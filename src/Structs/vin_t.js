const { Struct } = require('struct');
// AAAAAAAA0000000000000000000000000000000000000000000000000000010101010000BBBBBBBB
// aaaaaaaa0000f042002081457848a149003aa44600000000000000000000010101010000bbbbbbbb

function create_vin_t() {
  const vin_t = new Struct()
    .word32Ule('BlkBegVin')
    .floatle('MdlManChr')
    .floatle('MdlManInj')
    .floatle('MdlManCdr')
    .floatle('MdlManCar')
    .word8('MdlExhAcv')
    .word8('MdlMisAcv')
    .word8('MdlIgnAcv')
    .word8('MdlAlmAcv')
    .word8('ItfModReq')
    .word8('VinEndRes_0')
    .word8('VinEndRes_1')
    .word8('VinEndRes_2')
    .word32Ule('BlkEndVin');
  vin_t.allocate();
  vin_t.fields.BlkBegVin = 0xAAAAAAAA;
  vin_t.fields.BlkEndVin = 0xBBBBBBBB;
  return vin_t;
}

module.exports = { create_vin_t };
