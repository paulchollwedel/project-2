var db = require("../models");
var path = require("path")

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

<<<<<<< HEAD
  // app.get("/index", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/styles/index.html"));
  // });

  app.get("/index", function(req, res) {
    res.render("index");
=======
 app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/styles/index.html"));

>>>>>>> aaf85f8b13cf64726561b1b87dbc0ed567dd88d7
  });

  app.get("/art", function (req, res) {
    db.Artwork.findAll({ include: db.Artists })
      .then((data) => {
        var x = data.map(a => {
          return {
            artwork: a.toJSON(),
            artist: a.Artist.toJSON()
          }
        })
        var obj = {
          art: shuffle(x)
        };
        console.log(obj);
        res.render("art", obj);
      });
  });

  app.get("/contact", function (req, res) {
    res.render("contact");
  });

  app.get("/upload", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/styles/upload.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
