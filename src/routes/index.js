var express = require('express');
const { testEnvironmentVariable } = require('../settings');
var router = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200).json({ message: testEnvironmentVariable });
});

module.exports = router;
