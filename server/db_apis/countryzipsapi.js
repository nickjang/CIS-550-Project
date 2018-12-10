const database = require('../services/database.js');
 
async function findC(context) {
 //HAVE ZIP, WANT TO FIND COUNTY
  const binds = {};
  var query = ``;
  if (context.id) {
    binds.id = context.id;
 
    query = `select * from countyzips where ZIP = :id`;
  }
 
  const result = await database.doExecute(query, binds);

  console.log(result);
 
  return result.rows;
}

async function findZ(context) {
 //HAVE COUNTY, WANT TO FIND ZIP
  const binds = {};
  var query = ``;
  if (context.id) {
    binds.id = context.id;
 
    query = `select * from countyzips where COUNTY_FIPS = :id`;
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}
 
module.exports.findC = findC;
module.exports.findZ = findZ;