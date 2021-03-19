const db = require('./db');

async function init() {
  await db.init();
}

module.exports.init = init;
