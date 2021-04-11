const fs = require('fs');
const path = require('path');

async function getFileData(filename) {
  return new Promise((resolve) => {
    const { roast_id } = filename[0];
    fs.readFile(path.join(`src/RoastArchive/${roast_id}/DataStructs`), (err, binary) => {
      if (err) throw err;
      resolve(binary);
    });
  });
}
module.exports = getFileData;
