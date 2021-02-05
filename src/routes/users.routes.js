module.exports = app => {
    const users = require("../controllers/users.controller");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve all adults users
    router.get("/adults", users.findAllAdult);
  
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
  
    // Update a Users with id
    router.put("/:id", users.update);
  
    // Delete a Users with id
    router.delete("/:id", users.delete);
  
    // Create a new Users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };