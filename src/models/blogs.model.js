module.exports = (sequelize, Sequelize) => {
    const Blogs = sequelize.define("blogs", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Blogs;
  };