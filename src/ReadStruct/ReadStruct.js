const fs = require('fs');
const path = require('path');
const math = require('mathjs');
const performance = require('perf_hooks');
const { matrix } = require('mathjs');
const { formatServerData } = require('../Structs/DataStruct');

const formattedData = {};
async function processLineByLine() {
  const fileStream = fs.createReadStream(path.join('src/RoastArchive/TorraLive'));
  const structArray = [];
  let i = 0;

  fileStream.on('data', (data) => {
    structArray.push(...data);
  });

  fileStream.on('end', () => {
    while (structArray.length != 0) {
      subStruct[i] = structArray.splice(0, 1436);
      i++;
    }
    formattedData = formatServerData(buf);
  });
}
module.exports = { processLineByLine, formattedData };
