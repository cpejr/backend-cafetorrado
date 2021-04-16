const struct = require('struct');
const { createManualStructBuffer } = require('../Structs/toStruct_varData');

// let str = '';
// const buf = Buffer(24);
// function sendData() {
//   const struct = createManualStruct();
//   struct.set('BlkBegVar', 0xaaaaaaaa);
//   struct.set('BlkEndVar', 0xbbbbbbbb);
//   struct.set('MdlManChr', 117);
//   struct.set('MdlManInj', 28);
//   struct.set('temp', buf.toString());
//   console.log(struct.fields.temp);
//   // eslint-disable-next-line
//   for (const key in struct.fields) {
//     str += struct.fields[key];
//   }
//   const sentBuf = new Buffer(str);
//   return sentBuf;
// }

// module.exports = { sendData };
