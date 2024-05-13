const express = require('express');
const router = express.Router();

const {verify} = require('../controller/verification');

router.post('/', verify);

module.exports = router;