var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//celestrak
var Satcat = require( 'Satcat' );
var parser = new Satcat.Parser()
  .on( 'data', function( satellite ) {
    console.log( satellite )
    console.log( '' )
  })

router.get( 'http://www.celestrak.com/pub/satcat.txt', function( response ) {
  if( response.statusCode === 200 ) {
    console.log(response.pipe( parser ))
  } else {
    console.log( 'HTTP', response.statusCode )
    process.exit( 1 )
  }
})
