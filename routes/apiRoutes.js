const app = require("express").Router();
const db = require("../models");

// POST ROUTES =================================================================================

// Posts an artwork object to the database.
app.post("/api/post/artwork", function (req, res) {
  let userArtwork = {
    ArtistId: '1',
    title: 'Breathtaking Landscape',
    imgUrl: 'https://puu.sh/F0HaZ/f50c72dd54.jpeg',
    price: '$100',
    inStock: '5',
  }
  db.Artwork.create(userArtwork).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
});

// Posts an artist object to the database.
app.post("/api/post/artist", function (req, res) {
  let userArtist = {
    firstname: 'Justin',
    lastname: 'Singh',
    username: 'jsingh',
    email: 'jsingh@imsocool.com'
  }
  db.Artists.create(userArtist).then(function (dbArtist) {
    res.json(dbArtist);
  });
});

// Posts a Customer object to the database.
app.post("/api/post/customer", function (req, res) {
  let userCustomer = {
    firstname: 'James',
    lastname: 'Silverthorn',
    username: 'jsilverthorn',
    email: 'jsilverthorn@imsocool.com',
    creditCard: '0000-0000-0000-0000',
    mailingAddress: '1 Capitol Mall, Sacramento, California'
  }
  db.Customers.create(userCustomer).then(function (dbCustomer) {
    res.json(dbCustomer);
  });
});

// Posts a Shopping Cart object to the database.
app.post("/api/post/shoppingcart", function (req, res) {
  let userShoppingCart = {
    customerId: 1,
    artworkId: 1,
    quantity: 1,
    subtotal: "$100"
  }
  db.ShoppingCart.create(userShoppingCart).then(function (dbShoppingCart) {
    res.json(dbShoppingCart);
  });
});

// GET-ALL ROUTES =================================================================================

// Gets all artwork from the database and returns an array.
app.get("/api/get/artwork", function (req, res) {
  db.Artwork.findAll({}).then(function (dbresponse) {
    res.json(dbresponse)
  })
})

// Gets all artists from the database and returns an array.
app.get("/api/get/artists", function (req, res) {
  db.Artists.findAll({}).then(function (dbresponse) {
    res.json(dbresponse)
  })
})

// Gets all artists from the database and returns an array.
app.get("/api/get/customers", function (req, res) {
  db.Customers.findAll({}).then(function (dbresponse) {
    res.json(dbresponse)
  })
})

// Gets all artists from the database and returns an array.
app.get("/api/get/shoppingcarts", function (req, res) {
  db.ShoppingCart.findAll({}).then(function (dbresponse) {
    res.json(dbresponse)
  })
})

// GET-ONE ROUTES =================================================================================

// Returns a specific artist based on their unique id.
app.get("/api/get/artists/:id", function (req, res) {
  db.Artists.findOne({ where: { id: req.params.id } }).then(function (dbArtist) {
    res.json(dbArtist);
  });
})

// Returns a specific artist based on their username.
app.get("/api/get/artists/:username", function (req, res) {
  db.Artists.findOne({ where: { username: req.params.username } }).then(function (dbArtist) {
    res.json(dbArtist);
  });
})

// Returns a specific artist based on their first name.
app.get("/api/get/artists/:firstname", function (req, res) {
  db.Artists.findOne({ where: { firstname: req.params.firstname } }).then(function (dbArtist) {
    res.json(dbArtist);
  });
})

// Returns a specific artist based on their last name.
app.get("/api/get/artists/:lastname", function (req, res) {
  db.Artists.findOne({ where: { lastname: req.params.lastname } }).then(function (dbArtist) {
    res.json(dbArtist);
  });
})

// Returns a specific artwork based on its unique id.
app.get("/api/get/artwork/:id", function (req, res) {
  db.Artwork.findOne({ where: { id: req.params.id } }).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
})

// Returns a specific artwork based on its title.
app.get("/api/get/artwork/:title", function (req, res) {
  db.Artwork.findOne({ where: { title: req.params.title } }).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
})

// Returns a specific Customer based on their unique id.
app.get("/api/get/customer/:id", function (req, res) {
  db.Customers.findOne({ where: { id: req.params.id } }).then(function (dbCustomer) {
    res.json(dbCustomer);
  });
})

// Returns a specific Customer based on their username.
app.get("/api/get/customer/:username", function (req, res) {
  db.Customers.findOne({ where: { username: req.params.username } }).then(function (dbCustomer) {
    res.json(dbCustomer);
  });
})

// Returns a specific Shopping Cart based on its unique id.
app.get("/api/get/shoppingcart/:id", function (req, res) {
  db.ShoppingCart.findOne({ where: { id: req.params.id } }).then(function (dbShoppingCart) {
    res.json(dbShoppingCart);
  });
})

// DELETE ROUTES =================================================================================

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

// Delete a Cusomter by id
app.delete("/api/destroy/customer/:id", function (req, res) {
  db.Customers.destroy({ where: { id: req.params.id } }).then(function (dbCustomer) {
    res.json(dbCustomer);
  });
});

// Delete a Shopping Cart by id
app.delete("/api/destroy/shoppingcart/:id", function (req, res) {
  db.ShoppingCart.destroy({ where: { id: req.params.id } }).then(function (dbShoppingCart) {
    res.json(dbShoppingCart);
  });
});

// UPDATE ROUTES =================================================================================

// Updates an Artist on the database with any information passed in from the client
app.put("/api/update/artists", function (req, res) {
  db.Artists.update(req.body, {
    where: {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username
    }
  }).then(function (dbArtist) {
    res.json(dbArtist);
  });
});

// Updates Artwork on the database with any information passed in from the client
app.put("/api/update/artwork", function (req, res) {
  db.Artwork.update(req.body, {
    where: {
      id: req.body.id,
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      inStock: req.body.inStock,
      buyerId: req.body.buyerId
    }
  }).then(function (dbArtwork) {
    res.json(dbArtwork);
  });
});

// Updates a Customer on the database with any information passed in from the client
app.put("/api/update/customer", function (req, res) {
  db.Customers.update(req.body, {
    where: {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      creditCard: req.body.creditCard,
      mailingAddress: req.body.mailingAddress
    }
  }).then(function (dbCustomer) {
    res.json(dbCustomer);
  });
});

// Updates the Shopping Cart on the database with any information passed in from the client
app.put("/api/update/shoppingcart", function (req, res) {
  db.Post.update(req.body, {
    where: {
      id: req.body.id,
      customerId: req.body.customerId,
      artworkId: req.body.artworkId,
      quantity: req.body.quantity,
      subtotal: req.body.subtotal
    }
  }).then(function (dbShoppingCart) {
    res.json(dbShoppingCart);
  });
});

// Exports the app =================================================================================
module.exports = app;