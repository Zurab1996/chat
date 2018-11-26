
var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
	socket.on('message', function(data){
		io.sockets.emit('message', data)
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data)
	})
});