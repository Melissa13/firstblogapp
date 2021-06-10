const controllerService = require('../services/controller');
const glob = require('glob');
const path = require('path');
const { getModelName } = require('../services/utils');
const { getModel } = require('./db');

function init(app) {
  // require additional routes
  glob.sync('**/controllers/*.controller.js').forEach((filepath) => {
    const modelName = getModelName(filepath);
    const model = getModel(modelName);

    app.use(`/api/${modelName}`, require(path.resolve(filepath))(model));
  });

  // create the controllers for each model
  glob.sync('**/models/*.model.js').forEach((filepath) => {
    const modelName = getModelName(filepath);
    const router = controllerService.createDefaultController(modelName);

    app.use(`/api/${modelName}`, router);
  });
}

module.exports.init = init;
