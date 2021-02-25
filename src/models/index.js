const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
} = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const users = require('./users.model')(sequelize, Sequelize);
const blogs = require('./blogs.model')(sequelize, Sequelize);

users.hasMany(blogs, { as: 'blogs' });
blogs.belongsTo(users, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
module.exports.users = users;
module.exports.blogs = blogs;
