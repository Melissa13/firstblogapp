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
  return router;
};
