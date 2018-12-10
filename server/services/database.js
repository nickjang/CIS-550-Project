const oracledb = require('oracledb');

async function initialize() {
  const pool = await oracledb.createPool(
    {
      user          : "cis550projectveg",
      password      : "cis550projectvegpassword",
      connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = cis550project.cxskxepsenqz.us-east-2.rds.amazonaws.com)(PORT = 1521))(CONNECT_DATA =(SID= cis550)))"
    });
}

async function close() {
  await oracledb.getPool().close();
}

function doExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
 
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
 
    try {
      conn = await oracledb.getConnection();
 
      const result = await conn.execute(statement, binds, opts);
 
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.doExecute = doExecute;
module.exports.close = close;
module.exports.initialize = initialize;