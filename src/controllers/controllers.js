const { getModel } = require('../config/db');
const { createBasicFunctionsFor } = require('./helper');

['users', 'blogs'].forEach((key) => {
  module.exports[key] = createBasicFunctionsFor(getModel(key));
});
