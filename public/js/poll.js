window.addEventListener("load",function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 1000);
});

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

var title = $('.jumbotron h2');

// socket
var socket = io.connect('http://repoll.herokuapp.com/client');
//var socket = io.connect('http://192.168.0.102:3000/client');

socket.on('connect', function() {
  console.log('socket.io connected');
});

socket.on('master_ready', function(data) {
  var parsed;
  try {
    parsed = JSON.parse(data);
  } catch (e) {
    console.log('json parse exception');
    return;
  }
  console.log('master ready to vote with data!!');
  // build views
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
