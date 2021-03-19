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

async function createUser(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      user.id = 'user_id';

      console.log(user);
      resolve(user);
    }, 10);
  });
}

//toso estos son middleware
const validate = (req, res, next) => {
  const { body } = req;

  if (body.password) {
    return next();
  }

  res.status(422).send({ message: 'Missing "password" field ' });
};

// middleware o handler

app.post('/cmj', validate, (req, res, next) => {
  const { body } = req;

  body.password = `encrypted version of ${body.password}`;

  next();
});

app.post('/cmj', async (req, res) => {
  const response = await createUser(req.body);

  console.log('non default');

  res.send(response);
});

// default
app.post('/cmj', async (req, res) => {
  const response = await createUser(req.body);

  console.log('executed default');
  res.send(response);
});
require('./routes/users.routes')(app);
require('./routes/blogs.routes')(app);

module.exports = app;
