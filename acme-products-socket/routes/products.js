'use strict';

const express = require('express');
const router = express.Router();
const productsModel = require('./product.model.js');

module.exports = function(io) {

  // Navigate to the /products page
  router.get('/', (req, res) => {
    res.render('products', { products: productsModel.list() });
  });

  io.sockets.on('connection', socket => {
    socket.on('reqSeedData', () => {
      io.sockets.emit('seedData', productsModel.list());
    });

    // Process new products added on 'add.html'
    socket.on('newProduct', name => {
      let product = productsModel.addProduct(name);
      io.sockets.emit('newProduct', product);
    });

    // Form post to the specific product page (edit)
    socket.on('editProduct', editObj => {
      productsModel.editProduct(editObj);
      console.log(editObj);
      io.sockets.emit('editedProduct', editObj);
    });

    // Form post to the specific product page (delete)
    socket.on('deleteProduct', id => {
      productsModel.deleteProduct(id);
      io.sockets.emit('deleteProduct', id);
    });
  });

  // Navigate to a specific product and show the edit form
  router.get('/:id/edit', (req, res) => {
    let id = req.params.id;
    let product = productsModel.getProduct(id);
    res.render('edit', { product });
  });

  return router;
};
