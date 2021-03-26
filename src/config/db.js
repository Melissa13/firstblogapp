const glob = require('glob');
const Sequelize = require('sequelize');
const path = require('path');
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } = process.env;
const models = {};

async function init() {
  const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  glob.sync('**/models/*.model.js').forEach((filepath) => {
    const modelName = getModelName(filepath);

    models[modelName] = require(path.resolve(filepath))(sequelize, Sequelize);
  });
  // models['users'].hasMany(models['blogs'], { as: 'blogs' });
  // models['blogs'].belongsTo(models['users'], {
  //   foreignKey: 'userId',
  //   as: 'user'
  // });

  sequelize.sync();

  return sequelize;
}

function getModel(modelName) {
  return models[modelName];
}

function getModelName(filepath) {
  return filepath.split('/').pop().split('.')[0];
}

module.exports.init = init;
module.exports.getModel = getModel;
