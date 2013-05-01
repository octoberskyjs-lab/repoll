window.addEventListener("load",function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 1000);
});

var title          = $('.jumbotron h2');
var voteButtons    = $('.marketing');
var templateSource = $('#vote-template').html();
var voteTemplate   = Handlebars.compile(templateSource);

var isDebug = document.location.hostname === 'localhost';
var socket = io.connect(isDebug ?
  'http://localhost:3000/client' :
  'http://repoll.herokuapp.com/client'
);

var masterNotReady = function() {
  console.log('master not ready');
  title.text('No Polls Yet...');
  voteButtons.hide();
};

var masterReady = function() {
  title.text('Pick what you want!');
  voteButtons.append(voteTemplate({pp:['q1','q2','q3']}));
  voteButtons.show();
};

socket.on('connect', function() {
  console.log('socket.io connected');
});

socket.on('master_ready', function(chartData) {
  if (chartData.chart && chartData.chart === 'none') {
    masterNotReady();
    return;
  }

  console.log('master ready to vote with data!!');
  console.dir(chartData);
  masterReady(chartData);
});

socket.on('master_lost', function(data) {
  console.log('master lost');
  title.text('No Polls Yet...');
});

// ui event
$('.span12 .btn').on('click', function(e) {
  e.preventDefault();
  masterNotReady();
});
