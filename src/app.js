const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
db.sequelize.sync();
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });*/

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./routes/users.routes')(app);
require('./routes/blogs.routes')(app);

module.exports = app;
