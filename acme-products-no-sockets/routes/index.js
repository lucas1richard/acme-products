'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.use( '/vendor', express.static(path.join(__dirname, '../node_modules')));

router.use('/add/', require('./add'));
router.use('/products/', require('./products'));

module.exports = router;

