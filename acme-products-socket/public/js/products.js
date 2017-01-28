(function() {

  let products = [];
  var socket = io.connect();
  socket.on('connect', function(){
    console.log('connected to server via WebSockets!');
    socket.emit('reqSeedData');
  });
  socket.on('newProduct', function (emission) {
    add(emission);
  });
  socket.on('seedData', function(prod) {
    if (products.length) return;
    prod.forEach(add);
    logProducts();
  });
  socket.on('editedProduct', function(prod) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].data.id * 1 === prod.id * 1) {
        products[i].data.name = prod.name;
        products[i].name.val(' ' + prod.name);
        console.log(products[i].name);
        break;
      }
    }
  });

  let productList = document.getElementById('productList');
  console.log(productList);


  function add(productObj) {
    products.push(new ListItem(productObj));
  }

  function logProducts() {
    console.log(products);
  }

  function ListItem(data) {
    this.data = data;
    var li = new DivElem({ appendTo: productList, type: 'li', clss: 'list-group-item' });
    var deleteBtn = new DivElem({ appendTo: li, type: 'button', clss: 'btn btn-danger btn-xs', txt: 'Delete', clck: deleteProduct.bind(this) });
    this.name = new KYM_Text({ appendTo: li, txt: ' ' + data.name });
    var editBtn = new LinkElem({ appendTo: li, type: 'a', hrf: '/products/' + data.id + '/edit', clss: 'btn btn-default btn-xs pull-right', txt: 'Edit' });
    this.divObj = li.divObj;
  }
  ListItem.prototype = Object.create(CustomMethods.prototype);

  function deleteProduct() {
    socket.emit('deleteProduct', this.data.id);
    this.removeSelf();
  }

})();
