var socket = io.connect();

socket.on('connect', function(){
  console.log('connected to server via WebSockets!');
});

var addForm = document.getElementById('addForm');
var productName = document.getElementById('productName');

addForm.onsubmit = function(ev) {
  ev.preventDefault();
  socket.emit('newProduct', productName.value);
  productName.value = '';
  productName.focus();
};

socket.on('testEmission', function (emission) {
  console.log(emission);
});
