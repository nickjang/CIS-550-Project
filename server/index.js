const webServer = require('./webserver.js');
const database = require('./services/database.js');
process.env.UV_THREADPOOL_SIZE = 4;

async function startup() {
  console.log('Starting server');

  try {
    await database.initialize(); 
  } catch (err) {
    console.error(err);
 
    process.exit(1); // Non-zero failure code
  }

  try {

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();

async function shutdown(e) {
  let err = e;
 
  try {
    await webServer.close();
  } catch (e) {
 
    err = err || e;
  }

  try {
    await database.close(); 
  } catch (err) {
 
    err = err || e;
  }
 
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
 
// process.on('SIGTERM', () => {
//   console.log('Received SIGTERM');
 
//   shutdown();
// });
 
process.on('SIGINT', () => {
  console.log('Received SIGINT');

  process.exit(1);
});
 
// process.on('uncaughtException', err => {
//   console.log('Uncaught exception');
//   console.error(err);
 
//   shutdown(err);
// });