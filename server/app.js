/*
Server File
Runs via Node.js currently
*/

// basic variable declarations
// require neccessary APIs
var http = require('http');
var sio = require('socket.io');
var path = require('path');
var static = require('node-static');

// build server, listen, and serve necessary files in directory 
var app = http.createServer(handler);
var io = sio.listen(app);
var file = new static.Server(path.join(__dirname, '..', 'public'));

var port = 3000;

function handler(req, res) {
    file.serve(req, res);
}

// listen on '0.0.0.0' and port 3000 to allow other devices to connect
app.listen(port, '0.0.0.0', function() {
    console.log('listening on *:' + port);
});

// setup socket listeners on 'connection'
io.on('connection', function(socket) {
    socket.on('image', function (image) {
        socket.broadcast.emit('image', image);
    });
    socket.on('tap', function(location) {
        io.emit('tap', location);
    });
    socket.on('delete image', function() {
        io.emit('delete image'); 
    });
});