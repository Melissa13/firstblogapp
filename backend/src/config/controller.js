const controllerService = require('../services/controller');
const glob = require('glob');
const path = require('path');
const { getModelName } = require('../services/utils');
const { getModel } = require('./db');
const bcrypt = require('bcrypt');

async function init(app) {
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

  const initUser = getModel('users');
  const allUsers = await initUser.findAll();
  let noAdmin = true;
  allUsers.forEach((user) => {
    if (user.dataValues.email === 'admin@admin.com' && user.dataValues.role === 'Admin') {
      noAdmin = false;
    }
  });
  if (noAdmin) {
    const password = await bcrypt.hash('54321', 10);
    const admin = {
      name: 'Admin',
      lastName: 'Admin',
      email: 'admin@admin.com',
      password,
      country: 'Admin',
      role: 'Admin'
    };
    await initUser.create(admin);
  }
}

module.exports.init = init;
