// const { Users } = require('./users.model');

module.exports = (sequelize, Sequelize) => {
  const PublishedBlogs = sequelize.define('publishedBlogs', {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    authorId: {
      type: Sequelize.STRING
    },
    publishedUrl: {
      type: Sequelize.STRING
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return PublishedBlogs;
};
