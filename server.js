
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require('body-parser');
var logger = require("morgan");
// var Controllers = require('./server/controllers/controllers.js');

var ScrappedData = require('./database/models/scrapedData')
var SavedArticles = require('./database/models/savedArticles')

// Initialize Express
var app = express();




/*============================
=            CORS            =
============================*/

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
// Set the app up with morgan, body-parser, and a static folder
app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
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

/*===========================================
=            MONGOOSE CONNECTION            =
===========================================*/
mongoose.connect("mongodb://localhost:27017/scraper");
var db = mongoose.connection;
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


/*=====  End of MONGOOSE CONNECTION  ======*/



app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/all", function(req, res) {
    ScrappedData.find({}, function(error, found) {
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
        ScrappedData.create({
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

app.post("/savedArticles", (req, res)=> {
  var data = JSON.parse(req.body)
  SavedArticles.create({
    title: data.title,
    link: data.link
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

app.get("/savedArticles", (req,res) => {
  SavedArticles.find({}).exec((err, doc) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
})




//============================================================================//
// Listen on port 8080
app.listen(8080, function() {
  console.log("App running on port 8080!");
});