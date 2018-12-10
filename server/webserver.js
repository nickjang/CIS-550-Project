const http = require('http');
const express = require('express');
const morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const router = require('./router.js');
 
let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('./public'));
    app.use('/', router);

    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
 
    // app.get('/', async (req, res) => {
    //   const result = await database.doExecute('SELECT * FROM COUNTYZIPS WHERE ZIP = 71753');
    //   const out = result.rows[0].COUNTY_FIPS;
    //   //console.log((result.rows[0].COUNTY_FIPS));
 
    //   res.end(`output: ${out}`);
    // });
 
    httpServer.listen('8080')
      .on('listening', () => {
        console.log('listening on 8080');
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
 
      resolve();
    });
  });
}
 
module.exports.close = close;
module.exports.initialize = initialize;