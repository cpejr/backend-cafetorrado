/* eslint-disable no-underscore-dangle */
const { Struct } = require('struct');

const L1D_SMAX = 15;
const L2D_SMAX = 15;
const ADC_CMAX = 3;

const lut1d_t = new Struct()
  .array('Bkp_x', L1D_SMAX, 'floatle')
  .array('Tbl_z', L1D_SMAX, 'floatle');

const lut2d_t = new Struct()
  .array('Bkp_x', L2D_SMAX, 'floatle')
  .array('Bkp_y', L2D_SMAX, 'floatle')
  .array('Tbl_z', (L2D_SMAX * L2D_SMAX), 'floatle');

const create_par_t = (buffer) => {
  const par_t = new Struct()
    .word32Ule('BlkBegPar') // Header de validação da LUT inicial => 'eeeeeeee
    .struct('MdlWupChr', lut1d_t)
    .struct('MdlRunCdr', lut1d_t)
    .struct('MdlRunCar', lut1d_t)
    .struct('MdlRunCin', lut2d_t)
    .struct('MdlCorAir', lut2d_t)
    .array('AdcFacFil', ADC_CMAX, 'floatle')
    .floatle('BchFatFil')
    .floatle('BchFapFil')
    .floatle('BchFahFil')
    .floatle('MdlGraFil')
    .floatle('MdlRorFil')
    .floatle('MdlAirFil')
    .floatle('MdlWuhCdr')
    .floatle('MdlWuhCar')
    .floatle('MdlWuhTgr')
    .floatle('MdlWuhErr')
    .floatle('MdlWulCdr')
    .floatle('MdlWulCar')
    .floatle('MdlWulErr')
    .floatle('MdlChrCdr')
    .floatle('MdlChrCar')
    .floatle('MdlChrFil')
    .floatle('MdlChrTmp')
    .floatle('MdlUdsCdr')
    .floatle('MdlUdsCar')
    .floatle('MdlUdsCin')
    .floatle('MdlUdsHys')
    .floatle('MdlSdwCdr')
    .floatle('MdlSdwCar')
    .floatle('MdlSdwLim')
    .floatle('MdlDruMin')
    .floatle('MdlDruMax')
    .floatle('MdlAirMin')
    .floatle('MdlAirMax')
    .floatle('MdlInjMin')
    .floatle('MdlInjMax')
    .word16Ule('MdlWuhCnt')
    .word16Ule('MdlWulCnt')
    .word16Ule('MdlRunCor')
    .word8('ParEndRes_0')
    .word8('ParEndRes_1')
    .word32Ule('BlkEndPar'); // Header de validação da LUT => 'ffffffff'

  par_t._setBuff(buffer);
  return par_t;
};

module.exports = { create_par_t };
