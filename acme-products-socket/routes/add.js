'use strict';

const express = require('express');
const router = express.Router();

module.exports = function(io) {

  router.get('/', (req, res) => {
    res.render('add');
  });

  return router;
};
