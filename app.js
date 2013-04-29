
/**
 * Module dependencies.
 */

var express = require('express')
  , app     = express()
  , server  = require('http').createServer(app)
  , path    = require('path')
  , io      = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// for heroku
io.configure(function() {
  io.set('transports', ['xhr-polling']);
  io.set('polling duration', 10);
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  // for mobile client
  res.sendfile(__dirname + '/views/poll.html');
});

var masters = {};
var clients = {};
var isMasterReady = false;

var cacheItem = function(item, cache, callback) {
  if (!(item.id in cache)){
    cache[item.id] = item;
  }

  if (callback) callback();
}

// we need some verification for master. maybe...
io.of('/master').on('connection', function(master) {
  console.log('master connected - ' + master.id);

  cacheItem(master, masters, function() {
    console.log('master cached & ready to emit ');
  });

  master.on('disconnect', function() {
    delete masters[master.id];
    isMasterReady = false;
    console.log('master disconnected');
    for (var id in clients)
      clients[id].emit('master_lost', {});
  });

  master.on('master_ready', function(data) {
    console.log('master ready event');
    isMasterReady = true;
    for (var id in clients)
      clients[id].emit('master_ready', data);
  })
});

io.of('/client').on('connection', function(client) {
  console.log('client connected - ' + client.id);

  if (isMasterReady)
    client.emit('master_ready', {});

  cacheItem(client, clients, function() {
    console.log('client cached & ready to emit');

  });

  client.on('disconnect', function() {
    delete clients[client.id];
    console.log('client disconnected');
  });

  client.on('client_vote', function(data) {
    console.log('client try to vote');
    for (var id in masters) {
      masters[id].emit('client_intent', {hello:'master!!'});
    }
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
