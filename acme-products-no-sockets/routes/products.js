'use strict';

const express = require('express');
const router = express.Router();
const productsModel = require('./product.model.js');
const urlencodedParser = require('body-parser').urlencoded({ extended: false });

// Navigate to the /products page
router.get('/', (req, res) => {
  res.render('products', { products: productsModel.list() });
});

//if you are going to use bodyParser you are probably going to use it for the entire app
//you shouldn't have to manually add the middlewear here..
// Form post to the /products page
router.post('/', urlencodedParser, (req, res) => {
  let name = req.body.name;//why let - does it change?
  let product = productsModel.addProduct(name);//this seems odd to me... why calling twice
  productsModel.addProduct(product);
  res.redirect( '/products' );
});

// Navigate to a specific product and show the edit form
router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  let product = productsModel.getProduct(id);//const
  res.render('edit', { product });//good
});

// Form post to the specific product page (delete)
router.delete('/:id', (req, res) => {
  let id = req.params.id * 1;
  productsModel.deleteProduct(id);
  res.redirect('/products');
});

// Form post to the specific product page (edit)
//again configure body parser for the app
router.put('/:id', urlencodedParser, (req, res) => {
  let id = req.params.id * 1;
  req.body.id = id;
  productsModel.editProduct(req.body);
  res.redirect('/products');
});


module.exports = router;
