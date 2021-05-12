/* eslint-disable no-unused-expressions */
const { Struct } = require('struct');
const { create_var_t } = require('./var_t');

const var_t = create_var_t();

// 88888888 04CC0120 2000 00000000 0000 3442 0000 34420000344200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999
// 88888888 04CC0120 2000 00000000 0000 0000 0000 00000000000000000000000000000000010101010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999
// 88888888 04cc0120 2000 aaaaaaaa 0000 f642 0000 c8420000a8420000b041000000000000010101010000bbbbbbbb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999
// 88888888 04cc0120 2000 aaaaaaaa 0000 f642 0000 c8420000a8420000b041000000000000010101010000bbbbbbbb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999
// 88888888 04cc0120 2000 aaaaaaaa 0000 0000 0000 00000000000000000000000000000000000000000000bbbbbbbb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999
//                        aaaaaaaa 0000 0000 0000 00000000000000000000000000000000000000000000bbbbbbbb
function create_cmd_t() {
  const cmdData = new Struct()
    .word32Ule('BlkBegCmd')
    .word32Ule('CmdMemAdr')
    .word16Ule('CmdMemLen')
    .array('CmdMemVal', 1, var_t)
    .chars('filler', 148)
    .word32Ule('BlkEndCmd');
  cmdData.allocate();
  const buf = cmdData.buffer();
  const { fields } = cmdData;
  fields.CmdMemVal[0].BlkBegVar = 0xAAAAAAAA;
  fields.CmdMemVal[0].BlkEndVar = 0xBBBBBBBB;
  fields.BlkBegCmd = 0x88888888;
  fields.CmdMemAdr = 0x2001CC04;
  fields.CmdMemLen = 0x20;
  fields.BlkEndCmd = 0x99999999;
  console.log(cmdData.buffer().toString('hex'));
  return cmdData;
}

const cmd_t = create_cmd_t();
let dataToSend = 1;

function update_cmd_t(data) {
  const {
    MdlManChr, MdlManInj, MdlManCdr, MdlManCar, MdlExhAcv, MdlMisAcv, MdlIgnAcv, MdlAlmAcv,
  } = data;

  MdlManChr && (cmd_t.fields.CmdMemVal[0].MdlManChr = MdlManChr);
  MdlManInj && (cmd_t.fields.CmdMemVal[0].MdlManInj = MdlManInj);
  MdlManCdr && (cmd_t.fields.CmdMemVal[0].MdlManCdr = MdlManCdr);
  MdlManCar && (cmd_t.fields.CmdMemVal[0].MdlManCar = MdlManCar);
  cmd_t.fields.CmdMemVal[0].MdlExhAcv = dataToSend;
  cmd_t.fields.CmdMemVal[0].MdlMisAcv = dataToSend;
  cmd_t.fields.CmdMemVal[0].MdlIgnAcv = dataToSend;
  cmd_t.fields.CmdMemVal[0].MdlAlmAcv = dataToSend;
  // console.log(cmd_t.buffer().toString('hex'));
  dataToSend = dataToSend ? 0 : 1;
}

function send_cmd_t() {
  const buf = cmd_t.buffer();
  return buf;
}

module.exports = { create_cmd_t, update_cmd_t, send_cmd_t };
