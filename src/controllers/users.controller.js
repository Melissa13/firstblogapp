const db = require('../models');
const Users = db.users;
const blogs = db.blogs;
const {
  createEntry,
  findAllEntry,
  findOneEntry,
  updateEntry,
  deleteEntry,
  deleteAllEntries,
  searchByParam
} = require('./helper');

// Create and Save a new User
exports.create = (req, res) => {
  // Create and Save user in the database
  createEntry(req, res, Users);
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
  findAllEntry(res, Users, req.query.name);
};

// Find a single user with an id
exports.findOne = (req, res) => {
  findOneEntry(res, Users, req.params.id);
};

// Find a single user with an id and blogs
exports.findUserBlogs = (req, res) => {
  const { id } = req.params;

  Users.findByPk(id, { include: [blogs] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Are you sure that this user with id=${id} Exist?`,
        err
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  updateEntry(req, res, Users, req.params.id);
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  deleteEntry(res, Users, req.params.id);
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  deleteAllEntries(res, Users, req.params.id);
};

// Find all adult users
exports.findAllAdult = (req, res) => {
  searchByParam(res, Users, { adult: true });
};
