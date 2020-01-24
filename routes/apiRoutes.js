const app = require("express").Router();
const db = require("../models");

// This route posts an artwork object to the database.
app.post("/api/post/artwork", function (req, res) {
  let userArtwork = {
    artistId: '1',
    title: 'Breathtaking Landscape',
    imgUrl: 'https://puu.sh/F0HaZ/f50c72dd54.jpeg',
    price: '$100',
    inStock: '5',
  }
  db.Artwork.create(userArtwork).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
});

// This route posts an artist object to the database.
app.post("/api/post/artist", function (req, res) {
  let userArtist = {
    firstname: 'justin',
    lastname: 'singh',
    username: 'chaos',
  }
  db.Artists.create(userArtist).then(function (dbArtist) {
    res.json(dbArtist);
  });
});

// This route gets all artwork from the database and returns an array.
app.get("/api/get/artwork", function (req, res) {
  db.Artwork.findAll({}).then(function (dbresponse) {
    res.json(dbresponse)
  })
})

// This route gets all artists from the database and returns an array.
app.get("/api/get/artists", function (req, res) {
  db.Artists.findAll({}).then(function (dbresponse) {
    res.json(dbresponse)
  })
})

// This route returns a specific artist based on their unique id.
app.get("/api/get/artists/:id", function (req, res) {
  db.Artists.findOne({ where: { id: req.params.id } }).then(function (dbArtist) {
    res.json(dbArtist);
  });
})

// This route returns a specific artwork based on its unique id.
app.get("/api/get/artwork/:id", function (req, res) {
  db.Artwork.findOne({ where: { id: req.params.id } }).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
})

// Delete an Artist by id
app.delete("/api/destroy/artists/:id", function (req, res) {
  db.Artists.destroy({ where: { id: req.params.id } }).then(function (dbArtist) {
    res.json(dbArtist);
  });
});

// Delete an Artwork by id
app.delete("/api/destroy/artwork/:id", function (req, res) {
  db.Artwork.destroy({ where: { id: req.params.id } }).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
});

module.exports = app;