module.exports = (UserModel) => {
  const router = require('express').Router();

  router.get('/adults', async (req, res) => {
    try {
      const result = await UserModel.findAll({ where: { adult: true } });

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the user model do not hear you... or does not want to.'
      });
    }
  });
  return router;
};
