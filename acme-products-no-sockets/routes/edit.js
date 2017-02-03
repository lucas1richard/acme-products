'use strict';
//is this being used?
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
  console.log(req.params);
  res.render('edit');
});

router.put('/', urlencodedParser, (req, res) => {
  res.render('edit');
});

router.delete('/', urlencodedParser, (req, res) => {
  res.render('edit');
});

module.exports = router;
