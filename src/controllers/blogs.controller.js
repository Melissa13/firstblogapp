const db = require('../models');
const Blogs = db.blogs;
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'blog cant be null!...use your brain!',
    });
    return;
  }

  // Create a blog
  const blog = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };

  // Save blog in the database
  Blogs.create(blog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'creation of the blog failed... what did you do wrong now?',
      });
    });
};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Blogs.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'the database is ignoring you.',
      });
    });
};

// Find a single blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blogs.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Are you sure that this blog with id=${id} Exist?`,
      });
    });
};

// Update a blog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Blogs.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Blog data updated successfully. Now the FBI can't find it",
        });
      } else {
        res.send({
          message: `Cannot update Blog with id=${id}. Maybe the police already find it, RUN!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Blog with id=${id}`,
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blogs.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message:
            "Blog was deleted successfully, now the FBI can't associate it with this site!",
        });
      } else {
        res.send({
          message: `Cannot delete Blog with id=${id}. Maybe blog was not found, maybe is already erased... who knows...`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Blog with id=${id}`,
      });
    });
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
  blogs
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({
        message: `${nums} Blog were deleted successfully, it was time!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while removing all blogs... you just can\'t go there erasing the evidence',
      });
    });
};

// Find all published blogs
exports.findAllPublished = (req, res) => {
  Blogs.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving blogs.',
      });
    });
};
