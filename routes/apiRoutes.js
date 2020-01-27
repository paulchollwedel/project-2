const app = require("express").Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const emailer = require("")
const config = require("config\recoverPassword"); 
// POST ROUTES =================================================================================
//
app.use(cookieParser());
app.post('/api/post/artist', async function (req, res) {
  const email = req.body.email.toLowerCase();
  //hash our password
  bcrypt.hash(req.body.password, 10).then(function (data) {
    console.log(data);
    return data
  });
  const password = await bcrypt.hash(req.body.password, 10);
  //create the user in the database
  const user = await db.Artists.create({
    email: email,
    password: password
  });
  //create our cookie
  const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  res.json(user);
});
app.post('/api/user/login', async function (req, res) {
  const user = await db.User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) {
    res.json('NO USER FOUND WITH THAT EMAIL');
  }
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) {
    res.json('INCORRECT PASSWORD ENTERED');
  }
  //create our cookie
  const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  res.json(user);
});
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const { id } = jwt.verify(token, process.env.APP_SECRET);
    req.user = id;
  }
  console.log('i am middleware');
  next();
})

// POST ROUTES =================================================================================

// Posts an artwork object to the database.
app.post("/api/post/artwork", function (req, res) {
  req.imgUrl = 'https://puu.sh/F0HaZ/f50c72dd54.jpeg',
    db.Artwork.create(req).then(function (dbArtwork) {
      res.json(dbArtwork);
    });
});

// Posts an artist object to the database.
app.post("/api/post/artist", function (req, res) {
  db.Artists.create(req.body).then(function (dbArtist) {
    res.json(dbArtist);
  });
});

// Posts a Customer object to the database.
app.post("/api/post/customer", function (req, res) {
  db.Customers.create(req).then(function (dbCustomer) {
    res.json(dbCustomer);
  });
});

// Posts a Shopping Cart object to the database.
app.post("/api/post/shoppingcart", function (req, res) {
  db.ShoppingCart.create(req).then(function (dbShoppingCart) {
    res.json(dbShoppingCart);
  });
});

// GET-ALL ROUTES =================================================================================

// Gets all artwork from the database and returns an array.
app.get("/api/get/artwork", function (req, res) {
  var query = {};
  if (req.query.author_id) {
    query.AuthorId = req.query.author_id;
  }
  db.Artwork.findAll({
    where: query
  }).then(function (dbresponse) {
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

// Gets all artwork titles and artist names from the database and returns an array.
app.get("/api/get/artworktitles", function (req, res) {
  let artworkTitles = []
  db.Artwork.findAll({}).then(function (dbresponse) {
    dbresponse.forEach(function (item) {
      var artworkObj = {
        title: item.title
      }
      artworkTitles.push(artworkObj)
      return artworkTitles
    })
    console.log(artworkTitles)
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