/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// let refreshTokens = [];

module.exports = (UserModel) => {
  const router = require('express').Router();

  router.get('/adults', async (req, res) => {
    try {
      const result = await UserModel.findAll({ where: { adult: true } });

      return res.send({ message: `${result}` });
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the user model do not hear you... or does not want to.'
      });
    }
  });

  // create with encrypted password
  router.post('/', async (req, res, next) => {
    const oldUser = await UserModel.findOne({ where: { email: req.body.email } });
    if (oldUser) {
      return res.status(409).send({ message: 'User Already Exist. Please Login' });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    return next();
  });

  // update with encrypted password
  router.put('/:id', async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    return next();
  });

  // authenticate and return JWT token
  router.post('/login', async (req, res) => {
    try {
      const validUser = await UserModel.findOne({ where: { email: req.body.email } });
      if (validUser == null) {
        return res.status(404).send({ message: 'User does not exist!' });
      }
      if (await bcrypt.compare(req.body.password, validUser.password)) {
        const accessToken = generateAccessToken({
          user_id: validUser.id,
          email: validUser.email,
          role: validUser.role
        });
        const refreshToken = generateRefreshToken({
          user_id: validUser.id,
          email: validUser.email,
          role: validUser.role
        });
        return res.json({ accessToken, refreshToken });
      } else {
        return res.status(401).send({ message: 'Password Incorrect!' });
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // authenticate and return JWT token
  router.post('/refreshToken', async (req, res) => {
    try {
      // if (!refreshTokens.includes(req.body.token))
      //   return res.status(400).send('Refresh Token Invalid');

      // refreshTokens = refreshTokens.filter((c) => c != req.body.token);
      //remove the old refreshToken from the refreshTokens list

      const accessToken = generateAccessToken({
        user_id: req.body.id,
        email: req.body.email,
        role: req.body.role
      });
      const refreshToken = generateRefreshToken({
        user_id: req.body.id,
        email: req.body.email,
        role: req.body.role
      });
      //generate new accessToken and refreshTokens

      res.json({ accessToken, refreshToken });
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  router.delete('/logout', async (req, res) => {
    try {
      refreshTokens = refreshTokens.filter((c) => c != req.body.token);
      //remove the old refreshToken from the refreshTokens list
      res.status(204).send({ message: 'Logged out!' });
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the user model do not hear you... or does not want to.'
      });
    }
  });

  router.get('/postsToken', validateToken, (req, res) => {
    res.send({ message: `${req.user.email} successfully accessed post` });
  });

  /*router.get('/', validateToken, async (req, res) => {
    console.log('Token is valid');
    console.log(req.user.email);
    res.send(`${req.user.email} successfully accessed post`);
  });*/

  return router;
};

function validateToken(req, res, next) {
  //get token from request header
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  if (token == null) res.sendStatus(400).send({ message: 'Token not present' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send({ message: 'Token invalid' });
    } else {
      req.user = user;
      next();
    }
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' });
  // refreshTokens.push(refreshToken);
  return refreshToken;
}
