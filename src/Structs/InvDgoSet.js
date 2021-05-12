const { Struct } = require('struct');
const hexToBinary = require('hex-to-binary');

const struct = new Struct()
  .word16Ule('elements');
struct.allocate();

function parseHex(InvDgoSet) {
  const { 0: elem1, 1: elem2 } = InvDgoSet;

  struct.fields.elements = elem1;
  const buf1 = struct.buffer();
  const binary1 = hexToBinary(buf1.toString('hex'));
  const array1 = [...binary1];
  const obj1 = { D: array1.splice(0, 8), R: array1 };

  struct.fields.elements = elem2;
  const buf2 = struct.buffer();
  const binary2 = hexToBinary(buf2.toString('hex'));
  const array2 = [...binary2];
  const obj2 = { D: array2.splice(0, 8), R: array2 };

  return [obj1, obj2];
}

module.exports = { parseHex };
