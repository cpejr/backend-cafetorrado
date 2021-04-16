const { Struct } = require('struct');
const net = require('net');
const { formatServerData } = require('./toStruct_Data');
const { createManualStruct } = require('./toStruct_varData');

const varData = createManualStruct();
const client = new net.Socket();
// 8888888804CC012020000000000000003442000034420000344200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999
// 8888888804cc0120200000000000000000420000c4420000204100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099999999

function CommandData(req, res) {
  try {
    const {
      ManChr, ManInj, ManCdr, ManCar,
    } = req.body;
    console.log(ManChr);
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
    fields.CmdMemVal[0].MdlManChr = ManChr;
    fields.CmdMemVal[0].MdlManInj = ManInj;
    fields.CmdMemVal[0].MdlManCdr = ManCdr;
    fields.CmdMemVal[0].MdlManCar = ManCar;
    fields.BlkEndCmd = 0x99999999;

    client.connect(888, '192.168.5.1', () => {
      client.on('data', (data) => {
        client.write(buf);
        const formattedData = formatServerData(data);
        const validatorBegin = formattedData.get('BlkBegDaq').toString(16);
        const validatorEnd = formattedData.get('BlkEndDaq').toString(16);
        if (validatorBegin === 'cccccccc' && validatorEnd === 'dddddddd' && validatorBegin !== 0 && validatorEnd !== 0) {
          console.log(formattedData.fields.MdlInjOut, ' inj');
          console.log(formattedData.fields.MdlDruOut, 'dru');
          console.log(formattedData.fields.MdlAirOut, 'air');
        }
      });
    });
    return res.status(200).json({ message: 'data sent to server' });
  } catch (err) {
    return res.status(500).json({ message: 'Error on setting data' });
  }
}
module.exports = { CommandData };
