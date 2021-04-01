const fs = require('fs');
const path = require('path');
const math = require('mathjs');
const performance = require('perf_hooks');
const { matrix } = require('mathjs');
const { formatServerData } = require('../Structs/DataStruct');

async function processLineByLine() {
  const fileStream = fs.createReadStream(path.join('src/RoastArchive/TorraLive'));
  const structArray = [];
  fileStream.on('data', (data) => {
    structArray.push(...data);
    // console.log(structArray.length / 1436);
  });
  fileStream.on('end', () => {
    // let iterator = structArray.length; let i = 0; let
    //   j = 0; let _iterator = 0;
    // const matrixStruct = Array.from(Array(structArray.length / 1436), () => new Array(1436));
    // while (iterator != 0) {
    //   while (j < 1436) {
    //     matrixStruct[i][j] = structArray[_iterator];
    //     j++;
    //     _iterator++;
    //   }
    //   j = 0;
    //   iterator -= 1436;
    //   i++;
    // }
    const subStruct = [];
    let i = 0;
    while (structArray.length != 0) {
      subStruct[i] = structArray.splice(0, 1436);
      i++;
    }
    // console.log(matrixStruct.length);
    // matrixStruct.forEach((elem) => {
    //   buf = new Buffer(elem);
    //   const formattedData = formatServerData(buf);
    //   console.log('BlkBegDaq', formattedData.get('BlkBegDaq').toString(16));
    //   console.log('MdlRunCnt', formattedData.get('MdlRunCnt'));
    //   console.log('MdlAirScl', formattedData.get('MdlAirScl'));
    //   console.log('MdlGraScl', formattedData.get('MdlGraScl'));
    //   console.log('MdlDisErr', formattedData.get('MdlDisErr'));
    //   console.log('MdlInjOut', formattedData.get('MdlInjOut'));
    //   console.log('MdlDruOut', formattedData.get('MdlDruOut'));
    //   console.log('MdlAirOut', formattedData.get('MdlAirOut'));
    //   console.log('BlkEndDaq', formattedData.get('BlkEndDaq').toString(16));
    // });
    const t1 = performance.performance.now();
    console.log('This script took', t1 - t0, 'millisenconds to perform');
    // subArray.forEach((elem) => {
    //   const buf = new Buffer(elem);
  });
}
module.exports = { processLineByLine };
