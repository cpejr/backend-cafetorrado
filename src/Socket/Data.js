const { promises: fs } = require('fs');
const path = require('path');

async function getFileData(roast_id) {
  const res = await fs.readFile(path.join(`src/RoastArchive/${roast_id}/DataStructs`));
  return res;
}
module.exports = getFileData;
