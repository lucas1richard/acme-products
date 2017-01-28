'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = function(io) {

  router.use( '/vendor', express.static(path.join(__dirname, '../node_modules')));
  router.use( '/js', express.static(path.join(__dirname, '../public/js')));

  router.use('/add/', require('./add')(io));
  router.use('/products/', require('./products')(io));

  return router;

};
