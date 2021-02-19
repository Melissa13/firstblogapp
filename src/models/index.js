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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users.model')(sequelize, Sequelize);
db.blogs = require('./blogs.model')(sequelize, Sequelize);

db.users.hasMany(db.blogs, { as: 'blogs' });
db.blogs.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = db;
