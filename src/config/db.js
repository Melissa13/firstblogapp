const Sequelize = require('sequelize');
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } = process.env;
let models;

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

  const users = require('../models/users.model')(sequelize, Sequelize);
  const blogs = require('../models/blogs.model')(sequelize, Sequelize);

  models = {
    users,
    blogs
  };

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

module.exports.init = init;
module.exports.getModel = getModel;
