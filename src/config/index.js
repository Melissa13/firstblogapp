const db = require('./db');
const controller = require('./controller');

async function init(app) {
  await db.init();
  controller.init(app);
}

module.exports.init = init;
