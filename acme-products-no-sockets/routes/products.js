'use strict';

const express = require('express');
const router = express.Router();
const productsModel = require('./product.model.js');
const urlencodedParser = require('body-parser').urlencoded({ extended: false });

// Navigate to the /products page
router.get('/', (req, res) => {
  res.render('products', { products: productsModel.list() });
});

// Form post to the /products page
router.post('/', urlencodedParser, (req, res) => {
  let name = req.body.name;
  let product = productsModel.addProduct(name);
  productsModel.addProduct(product);
  res.redirect( '/products' );
});

// Navigate to a specific product and show the edit form
router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  let product = productsModel.getProduct(id);
  res.render('edit', { product });
});

// Form post to the specific product page (delete)
router.delete('/:id', (req, res) => {
  let id = req.params.id * 1;
  productsModel.deleteProduct(id);
  res.redirect('/products');
});

// Form post to the specific product page (edit)
router.put('/:id', urlencodedParser, (req, res) => {
  let id = req.params.id * 1;
  req.body.id = id;
  productsModel.editProduct(req.body);
  res.redirect('/products');
});


module.exports = router;
