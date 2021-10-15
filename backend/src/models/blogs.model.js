// const { Users } = require('./users.model');

module.exports = (sequelize, Sequelize) => {
  const Blogs = sequelize.define('blogs', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    authorId: {
      type: Sequelize.STRING
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  // references: {
  //   model: 'users',
  //   key: 'id'
  // }

  // Blogs.associate = (models) => {
  //   Blogs.belongsTo(models.users, {
  //     foreignKey: 'authorId',
  //     targetKey: 'id'
  //   });
  // };

  return Blogs;
};
