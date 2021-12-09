module.exports = (BlogModel) => {
  const router = require('express').Router();

  router.get('/published', async (req, res) => {
    try {
      const result = await BlogModel.findAll({ where: { published: true } });

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the blog model do not hear you... or does not want to.'
      });
    }
  });

  // get blog by url slug
  router.get('/published/:publishedUrl', async (req, res) => {
    try {
      const result = await BlogModel.findOne({ where: { publishedUrl: req.params.publishedUrl } });

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  return router;
};
