const { Struct } = require('struct');

const ADC_CMAX = 3;
const TMP_CMAX = 2;
const INV_CMAX = 2;

function unpack_memvar_t(buffer) {
  const serverData = new Struct()
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
    .word32Ule('BlkEndVin')
    .word32Ule('BlkBegVou') // blk_t
    .word32Ule('MdlWrkCnt')
    .array('AdcInpLin', ADC_CMAX, 'floatle')
    .array('AdcInpScl', ADC_CMAX, 'floatle')
    .array('TmpInpLin', TMP_CMAX, 'floatle')
    .floatle('CpuTmpScl')
    .floatle('CpuVrfScl')
    .floatle('CpuVbtScl')
    .floatle('BchTmpLin')
    .floatle('BchTmpScl')
    .floatle('BchPrsLin')
    .floatle('BchPrsScl')
    .floatle('BchHumLin')
    .floatle('BchHumScl')
    .array('InvSpdReq', INV_CMAX, 'floatle')
    .array('InvTrqReq', INV_CMAX, 'floatle')
    .array('InvTmpScl', INV_CMAX, 'floatle')
    .floatle('InvPrsScl')
    .floatle('InjPwmReq')
    .floatle('MdlGraLin')
    .floatle('MdlGraScl')
    .floatle('MdlAirLin')
    .floatle('MdlAirScl')
    .floatle('MdlRorPrv')
    .floatle('MdlRorCur')
    .floatle('MdlRorVal')
    .floatle('MdlDisErr')
    .floatle('MdlInjOut')
    .floatle('MdlDruOut')
    .floatle('MdlAirOut')
    .floatle('MdlTmpInt')
    .floatle('MdlTmpTgr')
    .floatle('MdlCorAir')
    .array('InvSpdSet', INV_CMAX, 'word16Sle')
    .array('InvTrqSet', INV_CMAX, 'word16Sle')
    .array('InvAd0Get', INV_CMAX, 'word16Sle')
    .array('InvAd1Get', INV_CMAX, 'word16Sle')
    .array('InvDgoSet', INV_CMAX, 'word16Ule') // abbio_t
    .array('InvTxoCnt', INV_CMAX, 'word16Ule')
    .array('InvRxoCnt', INV_CMAX, 'word16Ule')
    .array('InvRxcCnt', INV_CMAX, 'word16Ule')
    .array('InvRspCnt', INV_CMAX, 'word16Ule')
    .array('InvRedCnt', INV_CMAX, 'word16Ule')
    .array('InvWriCnt', INV_CMAX, 'word16Ule')
    .word16Ule('InjPwmSet')
    .word16Ule('MdlLocCnt')
    .word16Ule('MdlGenCnt')
    .word16Ule('MdlRunCnt')
    .array('InvModSts', INV_CMAX, 'word8Sle') // invst_t
    .array('TmpModSts', TMP_CMAX, 'word8Sle') // tempst_t
    .word8('AdcModSts') // adcst_t
    .word8('ItfMdlPrv') // mdlst_t
    .word8('MdlModPrv') // mdlst_t
    .word8('MdlModSts') // mdlst_t
    .word8('BchModSts') // bchst_t
    .word8('VouEndRes_0')
    .word8('VouEndRes_1')
    .word8('VouEndRes_2')
    .word32Ule('BlkEndVou');// blk_t

  serverData._setBuff(buffer);
  return serverData;
}

module.exports = { unpack_memvar_t };
