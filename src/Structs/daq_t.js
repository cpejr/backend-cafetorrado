const { Struct } = require('struct');

const ADC_CMAX = 3;
const TMP_CMAX = 2;
const INV_CMAX = 2;

function unpack_daq_t(buffer) {
  const serverData = new Struct()
    .word32Ule('BlkBegDaq') // blk_t
    .word32Ule('MdlRunCnt')
    .array('AdcInpLin', ADC_CMAX, 'floatle')
    .array('AdcInpScl', ADC_CMAX, 'floatle')
    .array('TmpInpLin', TMP_CMAX, 'floatle')
    .array('TmpInpScl', TMP_CMAX, 'floatle')
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
    .floatle('MdlAirScl') // Temperatura do Ar Scaled
    .floatle('MdlGraScl') // Temperatura do Grao Scaled
    .floatle('MdlDisErr') // Erro do Modelo
    .floatle('MdlInjOut') // Percentual de chama
    .floatle('MdlDruOut') // Percentual de tambor
    .floatle('MdlAirOut') // Percentual de ar
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
    .word8('InjPwmSet')
    .word8('MdlLocCnt')
    .word8('MdlGenCnt')
    .array('InvModSts', INV_CMAX, 'word8Sle') // invst_t
    .array('TmpModSts', TMP_CMAX, 'word8Sle') // tempst_t
    .word8('AdcModSts') // adcst_t
    .word8('ItfMdlPrv') // mdlst_t
    .word8('MdlModPrv') // mdlst_t
    .word8('MdlModSts') // mdlst_t
    .word8('BchModSts') // bchst_t
    .word32Ule('MemStrReq') // memst_t
    .word32Ule('MemModSts') // memst_t
    .word32Ule('BlkEndDaq');// blk_t

  serverData._setBuff(buffer);

  return serverData;
}

module.exports = { unpack_daq_t };
