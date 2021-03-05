const db = require('../models');
const { createBasicFunctionsFor } = require('./helper');

module.exports = createBasicFunctionsFor(db.users);
