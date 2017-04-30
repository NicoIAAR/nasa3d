var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
app.listen(3000);

// satellite.js
//var satellite=require('satellite.js');
//var satellite=require('./public/satellite.js').satellite;
//console.log(satellite.twoline2satrec);



var Cesium = require('cesium');
var jquery= require('jquery');



/*
var fs = require('fs'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();
fs.readFile('https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml', function(err, data) {
    console.log(parser.parseString(data));
});
*/

var xml2js = require('xml2js');
/*
var parser = new xml2js.Parser();

parser.on('error', function(err) { console.log('Parser error', err); });
app.get('https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml', function(res) {

       res.on('data', function(data_) { data += data_.toString(); });
       res.on('end', function() {
         console.log('data', data);
         parser.parseString(data, function(err, result) {
           console.log('FINISHED', err, result);
         });
       });

   });
*/


var fs = require('fs');

var parser = new xml2js.Parser();
fs.readFile('public/GHRSST_L4_G1SST_Sea_Surface_Temperature.xml', function(err, data) {
//fs.readFile('public/WMTSCapabilities.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        if(err){
          console.log("hay un error");
        }
        console.log(result);
    });
});

/*
var xml = require('xml');
var xmlObject = [ { url: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml' } ];
console.log(xml(xmlObject));
*/
/*
const XmlUrlParser = require('xml-url-parser');

const a = new XmlUrlParser({
  url: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml',
  selector: 'item'
});
*/

var texto=fs.readFile('public/science.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var obj=data.split("\r\n");
    var list=[];
    var sat, satrec;
    for(var fila=0;fila<obj.length;fila+=3){
      sat = {
        id: obj[fila],
        satrec : obj[fila+1],
        posvel : obj[fila+2]
        //,
        //satrec : satellite.twoline2satrec(obj[fila+1], obj[fila+2]),
        //posvel : satellite.sgp4(satrec, 1982)
      };
      list.push(sat)
    }
    console.log(list);
});


/*
var TLE = require( 'tle' );

var tle = TLE.parse( set );
*/
