const db = require('../models');
const Blogs = db.blogs;
const {
  createEntry,
  findAllEntry,
  findOneEntry,
  updateEntry,
  deleteEntry,
  deleteAllEntries,
  searchByParam
} = require('./helper');

// Create and Save a new blog
exports.create = (req, res) => {
  // Save blog in the database
  createEntry(req, res, Blogs);
};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
  findAllEntry(res, Blogs, req.query.title);
};

// Find a single blog with an id
exports.findOne = (req, res) => {
  findOneEntry(res, db.blogs, req.params.id);
};

// Update a blog by the id in the request
exports.update = (req, res) => {
  updateEntry(req, res, Blogs, req.params.id);
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  deleteEntry(res, Blogs, req.params.id);
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
  deleteAllEntries(res, Blogs, req.params.id);
};

// Find all published blogs
exports.findAllPublished = (req, res) => {
    searchByParam(res, Blogs, { published: true });
};
