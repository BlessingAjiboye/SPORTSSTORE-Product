const express = require("express");

const cors = require("cors");
const cookieSession = require("cookie-session");

 

const app = express();

const db = require("./app/models");
   const Role = db.role;

db.mongoose

  .connect(db.url, {

    useNewUrlParser: true,

    useUnifiedTopology: true

  })

  .then(() => {

    console.log("Connected to the database!");

  })

  .catch(err => {

    console.log("Cannot connect to the database!", err);

    process.exit();

  });

  function initial() {

  Role.estimatedDocumentCount((err, count) => {

    if (!err && count === 0) {

      new Role({

        name: "user"

      }).save(err => {

        if (err) {

          console.log("error", err);

        }

 

        console.log("added 'user' to roles collection");

      });

 

      new Role({

        name: "moderator"

      }).save(err => {

        if (err) {

          console.log("error", err);

        }

 

        console.log("added 'moderator' to roles collection");

      });

 

      new Role({

        name: "admin"

      }).save(err => {

        if (err) {

          console.log("error", err);

        }

 

        console.log("added 'admin' to roles collection");

      });

    }

  });

}

var corsOptions = {

 origin: ["http://localhost:8081"],  
credentials: true


};

 

app.use(cors(corsOptions));

 

// parse requests of content-type - application/json

app.use(express.json());

 

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

 app.use( 
 cookieSession({
    name: "Blessing-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable 
    httpOnly: true  
}));


// simple route

app.get("/", (req, res) => {

  res.json({ message: "Welcome to SportStore application." });

});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);
// set port, listen for requests

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);

});

 