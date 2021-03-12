var express = require('express');
var router = express.Router();

// var bodyParser = require('body-parser');
// var urlEncodedParser = bodyParser.urlencoded({extended:true});


//REDİS
// const redis = require("redis");
// const redisClient = redis.createClient();
const request = require('request');
let url = "http://159.65.124.240:8090/assets/tiles/Turkiye_clipped_small.tif.geojson";
let options = { json: true };


// redisClient.on("error", (e) => {
//   console.log("Don't forget to start Redis Server!")
//   console.error(e);
// });


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'CoSISE',
    description: 'Context-Based Satellite Imagery Search Engine'
  });
});

module.exports = router;

// DATA SAYFASI
router.get('/data', function (req, res) {
  
  request(url, options, (error, response, body) => {
    if (error) {
      return console.log(error)
    };
    if (!error && res.statusCode == 200) {
         // console.log(body);
      //console.log(JSON.stringify(body));
      
      res.send(body);
      res.end();
      
    };
  });
});

//MAP SAYFASI
router.get('/map', function(req,res){
  request(url, options, (error, response, body) => {
    if (error) {
      return console.log(error)
    };
    
    console.log("------------------------------REQ GET TILENAME: " + req.query.tid) //tid: tileId, gönderilen. geriye ilişkili tileId'ler redisten alınıp parametre olarak aşağıda kaydedilecek.

    if (!error && res.statusCode == 200) {
      let relevantTiles = [{id: "T"}];


      let data = body;
      res.render('map',{
        title: "CoSISE", // Give a title to our page
        jsonData: data, // Pass data to the View
        msg: "T_0_512",
        imgMenuOnOff : "/images/arrow-right-short.svg",
        resultTids: relevantTiles,
      });
    };
  });
});

//MAP SAYFASI
router.post('/map', function(req,res){
  request(url, options, (error, response, body) => {
    if (error) {
      return console.log(error)
    };

console.log("------------------------------REQ P O S T TILENAME: " + req.body.tid)
    if (!error && res.statusCode == 200) {
          //console.log(body);
      //console.log(JSON.stringify(body));
      //let data = JSON.stringify(body);
      let data = body;
      res.render('map',{
        title: "CoSISE", // Give a title to our page
        jsonData: data, // Pass data to the View
        msg: "T_0_512",
        imgMenuOnOff : "/images/arrow-right-short.svg",
  
      });
    };
  });
});

