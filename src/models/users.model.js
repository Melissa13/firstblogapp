module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "Blogger"
      },
      adult: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Users;
  };