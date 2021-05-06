const { getModel } = require('../config/db');

module.exports = (app) => {
  const router = require('express').Router();
  const blogModel = getModel('blogs');

  // crear
  router.post('/', async (req, res) => {
    try {
      const blogs = await blogModel.create(req.body);

      res.send(blogs);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // ver entradas
  router.get('/', async (req, res) => {
    try {
      const blogs = await blogModel.findAll();

      res.send(blogs);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  //ver entrada por ID
  router.get('/:id', async (req, res) => {
    try {
      const blogs = await blogModel.findByPk(req.params.id);

      res.send(blogs);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // actualizar
  router.put('/:id', async (req, res) => {
    try {
      const blogs = await blogModel.update(req.body, {
        where: { id: req.params.id }
      });

      res.send(blogs);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // borrar
  router.delete('/:id', async (req, res) => {
    try {
      const blogs = await blogModel.destroy({
        where: { id: req.params.id }
      });

      res.send(blogs);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  app.use('/api/blogs', router);
};
