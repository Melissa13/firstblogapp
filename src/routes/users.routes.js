const { createBasicRoutesFor } = require('./basicroutes');

module.exports = (app) => {
  const { users: userController } = require('../controllers/controllers');

  const router = createBasicRoutesFor(userController);

  app.use('/api/users', router);
};
