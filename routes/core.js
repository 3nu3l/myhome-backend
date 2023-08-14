const express = require('express');
var cors = require('cors')

const router = express.Router();

const {
  healthcheck
} = require('../controllers/core');

router.get('/', cors(), healthcheck);

module.exports = router;