const { Struct } = require('struct');
const { createManualStruct } = require('./toStruct_varData');

const varData = createManualStruct();

function createCmdStruct() {
  const cmdData = new Struct()
    .word32Ule('BlkBegCmd')
    .word32Ule('CmdMemAdr')
    .word16Ule('CmdMemLen')
    .array('CmdMemVal', 1, varData)
    .chars('filler', 144)
    .word32Ule('BlkEndCmd');
  cmdData.allocate();
  const buf = cmdData.buffer();
  const { fields } = cmdData;
  fields.BlkBegCmd = 0x88888888;
  fields.CmdMemAdr = 0x2001CC04;
  fields.CmdMemLen = 0x20;
  fields.BlkEndCmd = 0x99999999;
  return cmdData;
}

module.exports = { createCmdStruct };
