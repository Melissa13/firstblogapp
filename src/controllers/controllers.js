const db = require('../models');
const { createBasicFunctionsFor } = require('./helper');

['users', 'blogs'].forEach((key) => {
  module.exports[key] = createBasicFunctionsFor(db[key]);
});
