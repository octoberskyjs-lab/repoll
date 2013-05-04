var chartData = [
  {
    value : 0,
    color : "#F38630",
    desc : "java"
  },
  {
    value : 0,
    color : "#E0E4CC",
    desc : "javascript"
  },
  {
    value : 0,
    color : "#69D2E7",
    desc : "ruby"
  }
]

// chart
var ctx = $('#mychart').get(0).getContext('2d');
var chart = new Chart(ctx);
chart.Pie(chartData);

var debugServer  = 'http://192.168.0.102:3000';
var herokuServer = 'http://repoll.herokuapp.com:80';

var sio = io.connect(herokuServer + '/master');

sio.on('error', function() {
  var host = sio.socket.options.host;
  console.log('error connect to ' + host);
});

sio.on('connect', function() {
  console.log('socket.io connected to ' + sio.socket.options.host);
  sio.emit('master_ready', JSON.stringify(chartData));
});

sio.on('client_vote', function(data) {
  console.dir(data);
  chartData[data.selected].value += 1;
  chart.Pie(chartData);
});

window.onbeforeunload = function() {
  sio.emit('force_disconnect');
}