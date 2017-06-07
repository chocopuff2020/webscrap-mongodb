
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require('body-parser');
// var Controllers = require('./server/controllers/controllers.js');

// var ScrappedData = require('./database/models/scrapedData')


// Initialize Express
var app = express();

// mongoose.connect("mongodb://localhost/scraper");
// var db = mongoose.connection;

/*============================
=            CORS            =
============================*/

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

/*=====  End of CORS  ======*/



/*======================================
=      ROUTING for Scraping      =
======================================*/
// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData","savedArticles"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});


app.get("/scrape", function(req, res) {
  request("https://news.ycombinator.com/", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".title").each(function(i, element) {
      var title = $(this).children("a").text();
      var link = $(this).children("a").attr("href");
      if (title && link) {
        db.scrapedData.save({
          title: title,
          link: link
        },
        function(error, saved) {
          if (error) {
            console.log(error);
          }
          else {
            console.log(saved);
          }
        });
      }
    });
  });
  res.send("Scrape Complete");
});


/*=====  End of ROUTING for Scraping ======*/

// app.get("/scrape", function(req, res) {
//   request("https://news.ycombinator.com/", function(error, response, html) {
//     var $ = cheerio.load(html);
//     $(".title").each(function(i, element) {
//       var result = {};
//       result.title = $(this).children("a").text();
//       result.link = $(this).children("a").attr("href");

//       var scrappedData = new ScrappedData(result);
//       scrappedData.save(function(err, doc) {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           console.log(doc);
//         }
//       });
//     });
//   });
//   res.send("Scrape Complete");
// });


// app.get("/all", function(req, res) {
//   ScrappedData.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(found);
//     }
//   });
// });


/*=================================================
=            ROUTING for SavedArticles            =
=================================================*/

// Hook mongojs configuration to the db variable
// var db2 = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


app.post("/savedArticles", function(req, res) {
  console.log(req.body);
  db.savedArticles.insert(req.body, function(error, saved) {
    if (error) {
      console.log(error);
    }
    else {
      res.send(saved);
    }
  });
});



/*=====  End of ROUTING for SavedArticles  ======*/



// Listen on port 8080
app.listen(8080, function() {
  console.log("App running on port 8080!");
});