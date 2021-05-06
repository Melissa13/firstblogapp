module.exports = (UserModel) => {
  const router = require('express').Router();

  // create
  router.get('/test', async (req, res) => {
    console.log(req.body);
  });
  return router;
};
