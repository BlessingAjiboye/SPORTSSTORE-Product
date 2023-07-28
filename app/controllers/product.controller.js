const db = require("../models");

const Products = db.products;

 

// Create and Save a new Product

exports.create = (req, res) => {

  // Validate request

  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

 

  // Create a Product

  const product = new Products({

    name: req.body.name,

      description: req.body.description,

      price: req.body.price,

      category: req.body.category,

      published: req.body.published ? req.body.published : false

  });

 

  // Save Product in the database

  Products

    .create(product)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while creating the product."

      });

    });

};

 

 

// Retrieve all Products from the database.

exports.findAll = (req, res) => {

   const name = req.query.name;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

 

  Products.find(condition)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving products."

      });

    });

 

};

 

// Find a single Product with an id

exports.findOne = (req, res) => {

  const id = req.params.id;

 

  Products.findById(id)

    .then(data => {

      if (!data)

        res.status(404).send({ message: "Not found Product with id " + id });

      else res.send(data);

    })

    .catch(err => {

      res

        .status(500)

        .send({ message: "Error retrieving Product with id=" + id });

    });

 

};

 

// Update a Product by the id in the request

exports.update = (req, res) => {

  if (!req.body) {

    return res.status(400).send({

      message: "Data to update can not be empty!"

    });

  }

 

  const id = req.params.id;

 

  Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot update Product with id=${id}. Maybe Product was not found!`

        });

      } else res.send({ message: "Product was updated successfully." });

    })

    .catch(err => {

      res.status(500).send({

        message: "Error updating Product with id=" + id

      });

    });

 

};

 

// Delete a Product with the specified id in the request

exports.delete = (req, res) => {

  const id = req.params.id;

 

  Products.findByIdAndRemove(id)

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`

        });

      } else {

        res.send({

          message: "Product was deleted successfully!"

        });

      }

    })

    .catch(err => {

      res.status(500).send({

        message: "Could not delete Product with id=" + id

      });

    });

};

 

// Delete all Products from the database.

exports.deleteAll = (req, res) => {

   Products.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Products were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all products."

      });

    });

 

};

 

// Find all published Products

exports.findAllPublished = (req, res) => {

   Products.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving products."

      });

    });

 

};