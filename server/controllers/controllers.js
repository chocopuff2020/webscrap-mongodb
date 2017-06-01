
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// var Controllers = require('./server/controllers/controllers');

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


module.exports = {
    startScrap (req, res) {
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
    }
}