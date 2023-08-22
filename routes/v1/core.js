const express = require('express');
var cors = require('cors')

const router = express.Router();

const {
  ping,
  health
} = require('../../controllers/core');

router.get('/', cors(), ping);
router.get('/health', cors(), health);

module.exports = router;