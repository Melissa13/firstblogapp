module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    name: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'Blogger'
    },
    adult: {
      type: Sequelize.BOOLEAN
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });

  return Users;
};
