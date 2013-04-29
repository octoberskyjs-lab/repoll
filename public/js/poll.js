window.addEventListener("load",function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 1000);
});

var title = $('.jumbotron h2');

// socket
var socket = io.connect('http://repoll.herokuapp.com/client');

socket.on('connect', function() {
  console.log('socket.io connected');
});

socket.on('master_ready', function(data) {
  if (data)
    console.log('master ready to vote ' + JSON.parse(data));

  title.text('Pick what you want!');
});

socket.on('master_lost', function(data) {
  console.log('master lost');
  title.text('No Polls Yet...');
})
// ui event
$('.span12 .btn').on('click', function(e) {
  e.preventDefault();
  console.log('btn selected');
  socket.emit('client_vote');
});
