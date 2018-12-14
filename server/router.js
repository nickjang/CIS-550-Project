const express = require('express');
const router = new express.Router();

//require necessary files
const CZcont = require('./controllers/countryzipscont.js');
const Rcont = require('./controllers/restaurantscont.js');

//gets for getting info
 
router.route('/getcounty/:id?')
  .get(CZcont.getC);

router.route('/getzip/:id?')
  .get(CZcont.getZ);


// router.route('/restaurants/:state?')
//   .get(Rcont.get);

router.route('/data/:city?/:state?/:zip?')
  .get(Rcont.get);

router.route('/restaurants/bestR/:state?')
  .get(Rcont.getbestR);

router.route('/restaurants/bestcrim/:state?')
  .get(Rcont.getbestcrim);

router.route('/restaurants/bestpoll/:state?')
  .get(Rcont.getbestpoll);

router.route('/restaurants/worstR/:state?')
  .get(Rcont.getworstR);

router.route('/restaurants/worstcrim/:state?')
  .get(Rcont.getworstcrim);

router.route('/restaurants/worstpoll/:state?')
  .get(Rcont.getworstpoll);


//get for html files

router.get('/', function(req, res, next) {
  res.sendFile('views/index.html' , { root : __dirname});
  
});

router.get('/second', function(req, res, next) {
  res.sendFile('views/secondary.html' , { root : __dirname});
  
});
 
module.exports = router;