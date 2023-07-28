const db = require("../models");

const Categories = db.categories;

 

// Create and Save a new Categories

exports.create = (req, res) => {

  // Validate request

  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

 

  // Create a Categories

  const category = new Categories({

    name: req.body.name,

     

  });

 

  // Save Categories in the database

  Categories

    .save(category)

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

 

 

// Retrieve all Categories from the database.

exports.findAll = (req, res) => {

   const name = req.query.name;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

 

  Categories.find(condition)

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

 

// Find a single Categories with an id

exports.findOne = (req, res) => {

  const id = req.params.id;

 

  Categories.findById(id)

    .then(data => {

      if (!data)

        res.status(404).send({ message: "Not found Categories with id " + id });

      else res.send(data);

    })

    .catch(err => {

      res

        .status(500)

        .send({ message: "Error retrieving Product with id=" + id });

    });

 

};

 

// Update a Categories by the id in the request

exports.update = (req, res) => {

  if (!req.body) {

    return res.status(400).send({

      message: "Data to update can not be empty!"

    });

  }

 

  const id = req.params.id;

 

  Categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot update Product with id=${id}. Maybe Categories was not found!`

        });

      } else res.send({ message: "Category was updated successfully." });

    })

    .catch(err => {

      res.status(500).send({

        message: "Error updating Product with id=" + id

      });

    });

 

};

 

// Delete a Categories with the specified id in the request

exports.delete = (req, res) => {

  const id = req.params.id;

 

  Categories.findByIdAndRemove(id)

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`

        });

      } else {

        res.send({

          message: "Category was deleted successfully!"

        });

      }

    })

    .catch(err => {

      res.status(500).send({

        message: "Could not delete Category with id=" + id

      });

    });

};

 

// Delete all Categories from the database.

exports.deleteAll = (req, res) => {

   Categories.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Categories were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all categories."

      });

    });

 

};

 

// Find all published Categories

exports.findAllPublished = (req, res) => {

   Categories.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving categories."

      });

    });

 

};