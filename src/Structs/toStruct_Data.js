const { Struct } = require('struct');

const ADC_CMAX = 3;
const TMP_CMAX = 2;
const INV_CMAX = 2;
const abbio_t = new Struct()
  .word8Sle('DO1')
  .word8Sle('DO2')
  .word8Sle('DO3')
  .word8Sle('DO4')
  .word8Sle('DO5')
  .word8Sle('DO6')
  .word8Sle('DO7')
  .word8Sle('DO8')
  .word8Sle('RO1')
  .word8Sle('RO2')
  .word8Sle('RO3')
  .word8Sle('RO4')
  .word8Sle('RO5')
  .word8Sle('RO6')
  .word8Sle('RO7')
  .word8Sle('RO8');

function formatServerData(buffer) {
  const serverData = new Struct()
    .word32Ule('BlkBegDaq') // 4
    .word32Ule('MdlRunCnt') // 4
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
    .floatle('MdlAirScl') // Temperatura do Ar Scaled = 175
    .floatle('MdlGraScl') // Temperatura do Grao Scaled = 145
    .floatle('MdlDisErr') // Erro do Modelo = 5
    .floatle('MdlInjOut') // Percentual de chama = 25
    .floatle('MdlDruOut') // Percentual de tambor = 65
    .floatle('MdlAirOut') // Percentual de ar = 75
    .floatle('MdlTmpInt')
    .floatle('MdlTmpTgr')
    .floatle('MdlCorAir')
    .array('InvSpdSet', INV_CMAX, 'word8Sle')
    .array('InvTrqSet', INV_CMAX, 'word8Sle')
    .array('InvAd0Get', INV_CMAX, 'word8Sle')
    .array('InvAd1Get', INV_CMAX, 'word8Sle')
    .array('InvDgoSet', INV_CMAX, abbio_t)
    .array('InvTxoCnt', INV_CMAX, 'word8Ule')
    .array('InvRxoCnt', INV_CMAX, 'word8Ule')
    .array('InvRxcCnt', INV_CMAX, 'word8Ule')
    .array('InvRspCnt', INV_CMAX, 'word8Ule')
    .array('InvRedCnt', INV_CMAX, 'word8Ule')
    .array('InvWriCnt', INV_CMAX, 'word8Ule')
    .word8('InjPwmSet')
    .word8('MdlLocCnt')
    .word8('MdlGenCnt')
    .array('InvModSts', INV_CMAX, 'word8Sle')
    .array('TmpModSts', TMP_CMAX, 'word8Sle')
    .word8('AdcModSts')
    .word8('ItfMdlPrv')
    .word8('BchModSts')
    .word8('MemStrReq')
    .word8('MemModSts')
    .word32Ule('BlkEndDaq');
  // eslint-disable-next-line
    serverData._setBuff(buffer)

  return serverData;
}

module.exports = { formatServerData };
