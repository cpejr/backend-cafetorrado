const { Struct } = require('struct');

function formatServerData(buffer) {
  const serverData = new Struct()
    .word32Ule('BlkBegDaq') // 4
    .word32Ule('MdlRunCnt') // 4
    .chars('BlkNotTrc', 108)
    .floatle('MdlAirScl') // Temperatura do Ar Scaled = 175
    .floatle('MdlGraScl') // Temperatura do Grao Scaled = 145
    .floatle('MdlDisErr') // Erro do Modelo = 5
    .floatle('MdlInjOut') // Percentual de chama = 25
    .floatle('MdlDruOut') // Percentual de tambor = 65
    .floatle('MdlAirOut') // Percentual de ar = 75
    .chars('BlkNt2Trc', 76)
    .word32Ule('BlkEndDaq');
  // eslint-disable-next-line
    serverData._setBuff(buffer);
  return serverData;
}

module.exports = { formatServerData };
