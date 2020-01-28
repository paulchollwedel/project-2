var db = require("../models");
var path = require("path")

module.exports = function(app) {
  // Load index page

  // app.get("/index", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/styles/index.html"));
  // });

  app.get("/index", function(req, res) {
    res.render("index");
  });

  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/styles/contact.html"));
  });

  app.get("/art", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/styles/art.html"));
  });

  app.get("/upload", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/styles/upload.html"));
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
