const { getModel } = require('../config/db');

function createDefaultController(modelName) {
  const model = getModel(modelName);
  const router = require('express').Router();

  // create
  router.post('/', async (req, res) => {
    try {
      const result = await model.create(req.body);

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // get entries
  router.get('/', async (req, res) => {
    try {
      const result = await model.findAll();

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // get entry by id
  router.get('/:id', async (req, res) => {
    try {
      const result = await model.findByPk(req.params.id);

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // update
  router.put('/:id', async (req, res) => {
    try {
      const result = await model.update(req.body, {
        where: { id: req.params.id }
      });

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // borrar
  router.delete('/:id', async (req, res) => {
    try {
      const result = await model.destroy({
        where: { id: req.params.id }
      });

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  return router;
}

module.exports.createDefaultController = createDefaultController;
