const { createBasicRoutesFor } = require('./basicroutes');

module.exports = (app) => {
  const users = require('../controllers/users.controller');

  const router = createBasicRoutesFor(users);

  app.use('/api/users', router);
};
