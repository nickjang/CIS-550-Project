const database = require('../services/database.js');
 
// async function find(context) {
//   const binds = {};
//   var query = ``;
//   if (context.state) {
//     query = 'select * from restaurants where state = \'' + context.state + '\'';
//   }
 
//   const result = await database.doExecute(query, binds);

//   //console.log(result);
 
//   return result.rows;
// }

async function find(context) {
  const binds = {};
  var query = 'select * from restaurants where ';
  if (context.city != 'undefined') {
  	//console.log(context.city);
    query += 'city = \'' + context.city + '\' ';
  }
  if (context.state != 'undefined') {
  	if (context.city != 'undefined') {
	    query += 'AND ';
	  }
  	//console.log(context.state);
    query += 'state = \'' + context.state + '\' ';
  }
  if (context.zip != 'undefined') {
  	if (context.city != 'undefined' || context.state != 'undefined') {
	    query += 'AND ';
	  }
  	//console.log(context.zip);
    query += 'zip = \'' + context.zip + '\'';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}

async function findbestR(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from (select county_name, (res_counts / population) * 100000 res_per_100000 from (select c.county_name, c.population, count(r.restaurant_name)  res_counts from restaurants r join countyzips cz on r.zip = cz.zip join crimes c on cz.county_fips = c.county_fips where r.state = \'' + context.state + '\' group by c.county_name, c.population) order by res_per_100000 desc) where ROWNUM <= 5';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}

async function findbestcrim(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from (select distinct c.county_name, c.crime_rate_per_100000 from crimes c join countyzips cz on cz.county_fips = c.county_fips join restaurants r on cz.zip = r.zip WHERE r.state = \'' + context.state + '\' order by c.crime_rate_per_100000) WHERE ROWNUM <= 5';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}

async function findbestpoll(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from (select distinct c.county_name, a.days from crimes c JOIN air a on c.county_fips = a.countyflips JOIN countyzips cz on c.county_fips = cz.county_fips JOIN restaurants r ON cz.zip = r.zip where r.state = \'' + context.state + '\' order by a.days) WHERE ROWNUM <= 5';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}

async function findworstR(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from (select county_name, (res_counts / population) * 100000 res_per_100000 from (select c.county_name, c.population, count(r.restaurant_name)  res_counts from restaurants r join countyzips cz on r.zip = cz.zip join crimes c on cz.county_fips = c.county_fips where r.state = \'' + context.state + '\' group by c.county_name, c.population) order by res_per_100000) where ROWNUM <= 5';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}

async function findworstcrim(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from (select distinct c.county_name, c.crime_rate_per_100000 from crimes c join countyzips cz on cz.county_fips = c.county_fips join restaurants r on cz.zip = r.zip WHERE r.state = \'' + context.state + '\' order by c.crime_rate_per_100000 desc) WHERE ROWNUM <= 5';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}

async function findworstpoll(context) {
  const binds = {};
  var query = ``;
  if (context.state) {
    query = 'select * from (select distinct c.county_name, a.days from crimes c JOIN air a on c.county_fips = a.countyflips JOIN countyzips cz on c.county_fips = cz.county_fips JOIN restaurants r ON cz.zip = r.zip where r.state = \'' + context.state + '\' order by a.days desc) WHERE ROWNUM <= 5';
  }
 
  const result = await database.doExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;
module.exports.findbestR = findbestR;
module.exports.findbestcrim = findbestcrim;
module.exports.findbestpoll = findbestpoll;
module.exports.findworstR = findworstR;
module.exports.findworstcrim = findworstcrim;
module.exports.findworstpoll = findworstpoll;