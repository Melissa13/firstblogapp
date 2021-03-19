const { createBasicRoutesFor } = require('./basicroutes');

module.exports = (app) => {
  const { blogs } = require('../controllers/controllers');

  const router = createBasicRoutesFor(blogs);

  app.use('/api/blogs', router);
};
