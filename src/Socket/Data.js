const fs = require('fs');
const path = require('path');

async function getFileData(roast_id) {
  return JSON.parse(fs.readFileSync(path.join(`src/RoastArchive/${roast_id}/ParsedData.json`)));
}
module.exports = getFileData;
