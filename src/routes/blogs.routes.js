module.exports = (app) => {
  const blogs = require('../controllers/blogs.controller');

  const router = require('express').Router();

  // Create a new User
  router.post('/', blogs.createEntry);

  // Retrieve all blogs
  router.get('/', blogs.findAllEntries);

  // Retrieve a single user with id
  router.get('/:id', blogs.findOneEntry);

  // Update a blogs with id
  router.put('/:id', blogs.updateEntry);

  // Delete a blogs with id
  router.delete('/:id', blogs.deleteEntry);

  app.use('/api/blogs', router);
};
