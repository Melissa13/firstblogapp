module.exports = (app) => {
  const users = require('../controllers/users.controller');

  const router = require('express').Router();

  // Create a new User
  router.post('/', users.createEntry);

  // Retrieve all Users
  router.get('/', users.findAllEntries);

  // Retrieve a single user with id
  router.get('/:id', users.findOneEntry);

  // Update a Users with id
  router.put('/:id', users.updateEntry);

  // Delete a Users with id
  router.delete('/:id', users.deleteEntry);

  app.use('/api/users', router);
};
