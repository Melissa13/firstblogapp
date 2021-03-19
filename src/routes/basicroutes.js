function createBasicRoutesFor(controller) {
  const router = require('express').Router();

  // Create a new User
  router.post('/', controller.createEntry);

  // Retrieve all blogs
  router.get('/', controller.findAllEntries);

  // Retrieve a single user with id
  router.get('/:id', controller.findOneEntry);

  // Update a blogs with id
  router.put('/:id', controller.updateEntry);

  // Delete a blogs with id
  router.delete('/:id', controller.deleteEntry);

  return router;
}

module.exports.createBasicRoutesFor = createBasicRoutesFor;
