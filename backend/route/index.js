const express = require('express');
const router = express.Router();

const verificationRoute = require('./verfication');

router.use('/verification', verificationRoute);


module.exports = router;