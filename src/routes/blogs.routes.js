module.exports = (app) => {
  const blogs = require('../controllers/blogs.controller');

  var router = require('express').Router();

  // Create a new blog
  router.post('/', blogs.create);

  // Retrieve all blogs
  router.get('/', blogs.findAll);

  // Retrieve all published blogs
  router.get('/published', blogs.findAllPublished);

  // Retrieve a single blog with id
  router.get('/:id', blogs.findOne);

  // Update a blogs with id
  router.put('/:id', blogs.update);

  // Delete a blogs with id
  router.delete('/:id', blogs.delete);

  // Create a new blogs
  router.delete('/', blogs.deleteAll);

  app.use('/api/blogs', router);
};
