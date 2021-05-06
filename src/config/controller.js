const controllerService = require('../services/controller');

function init(app) {
  app.use('/api/users', require('../controllers/users.controller')());
  require('../controllers/blogs.controller')(app);

  ['users', 'blogs'].forEach(key => {
    const router = controllerService.createDefaultController(key);

    app.use(`/api/${key}`, router);
  });
}

module.exports.init = init;
