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


router.route('/restaurants/:state?')
  .get(Rcont.get);


//get for html files

router.get('/', function(req, res, next) {
  res.sendFile('views/index.html' , { root : __dirname});
  
});

router.get('/second', function(req, res, next) {
  res.sendFile('views/secondary.html' , { root : __dirname});
  
});
 
module.exports = router;