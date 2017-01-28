(function() {

  var socket = io.connect();
  socket.on('connect', function(){
    console.log('connected to server via WebSockets!');
  });

  let editForm = document.getElementById('editForm');
  let id = document.getElementById('id').value;

  let name = document.getElementById('name');

  editForm.onsubmit = function(ev) {
    ev.preventDefault();

    socket.emit('editProduct', { id, name: name.value });
  };

})();
