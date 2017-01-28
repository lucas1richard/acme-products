'use strict';

const _ = require('lodash');

let products = [
  { id: 1, name: 'foo'},
  { id: 2, name: 'bar'},
  { id: 3, name: 'bazz'},
];

function addProduct(name) {
  if(!name) return;
  let maxID = products.reduce( (id, product) => {
    if(product.id * 1 > id * 1) {
      id = product.id;
    }
    return id;
  }, 0);
  let productToInsert = { id: ++maxID, name };
  products.push(productToInsert);
  return productToInsert;
}

function deleteProduct(id) {
  products = products.filter( product => {
    return product.id * 1 !== id * 1;
  });
}

function editProduct(edit) {
  products = products.map( product => {
    if (product.id * 1 === edit.id * 1) {
      product = edit;
    }
    return product;
  });
}

function getProduct(id) {
  return products.reduce( (match, product) => {
    if (product.id * 1 === id * 1) {
      match.push(product);
    }
    return match;
  }, [])[0];
}

function list() {
  return _.cloneDeep(products);
}


module.exports = {
  addProduct:     addProduct,
  editProduct:    editProduct,
  deleteProduct:  deleteProduct,
  getProduct:     getProduct,
  list:           list
};
