const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "user cant be null!...use your brain!"
      });
      return;
    }
  
    // Create a user
    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      country: req.body.country,
      role: req.body.role,
      adult: req.body.adult ? req.body.adult : false
    };
  
    // Save user in the database
    Users.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "creation of the user failed... what did you do wrong now?"
        });
      });
  };

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Users.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "the database is ignoring you."
        });
      });
  };

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Users.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Are you sure that this user with id=" + id + " Exist?"
        });
      });
  };

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User data updated successfully. Now the FBI can't find it"
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe the police already get them, RUN!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully, now the FBI can't associate it with this site!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe user was not found, maybe is already dead... who knows...`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Userl with id=" + id
        });
      });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} User were deleted successfully, it was time!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users... you just can't go there killing people"
        });
      });
  };

// Find all adult users
exports.findAllAdult = (req, res) => {
    Users.findAll({ where: { adult: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };