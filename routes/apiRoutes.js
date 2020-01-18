const app = require("express").Router();

var db = require("../models");


  // Get all examples
  app.get("/api/artists", function(req, res) {
    db.Artists.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
      console.log(dbExamples);
    });

    // db.Artists.findAll({}).then((results) => {
    //   console.log(results)
    // })
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    let userObj ={
      firsname: 'justin',
      lastname: 'singh',
      username: 'chaos',
    }
    let userArt = {
      artistId: '1',
      title: 'Breathtaking Landscape',
      imgUrl: 'https://puu.sh/F0HaZ/f50c72dd54.jpeg',
      price: '$100',
      inStock: '5',
    }
    db.Artwork.create(userArt).then(function(dbExample) {
      res.json(dbExample);
    });
    db.Artists.create(userObj).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  module.exports = app;

