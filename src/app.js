const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const cors = require("cors");
const bodyParser = require("body-parser");
const db =require("./models");

const app = express();
db.sequelize.sync();
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });*/

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);
require('./routes/tutorial.routes')(app);
require('./routes/users.routes')(app);

module.exports = app;
