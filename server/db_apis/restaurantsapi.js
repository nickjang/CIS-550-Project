const database = require('../services/database.js');
 
async function find(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from restaurants where state = \'' + context.state + '\'';
  }
 
  const result = await database.doExecute(query, binds);

  //console.log(result);
 
  return result.rows;
}
 
module.exports.find = find;