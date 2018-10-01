// Variables.
var express = require("express")
var app = express();

app.set('port', process.env.PORT || 3000); // Port for server.
app.set('view engine', 'twig'); // Template engine
app.set('views', 'app/views'); // Set views.

// Access to public files.
app.use(express.static('app/public'));

// Link Routes.
app.use(require('./routes/chat'));

// Start server.
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

// Get the socket.io application.
var io = require('socket.io')(server);

// Listen for connections.
io.on('connection', function(socket) {
    socket.on('messageSent', function(data) {
       io.emit('messageUpdate', data);
    });
});