var socket = io();

var socket = io.connect('http://192.168.1.100:3000');

socket.on('connect', function(data) {
    // Get the form element.
    var chatForm = document.forms['chat-form'];
    if (chatForm) {

        // Get the inputs.
        var username = document.querySelector('#username-input');
        var message = document.querySelector('#message-input');
        
        // On form submit show the message and emit an event to the local server.
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var data = {
                username: username.value,
                message: message.value
            };

            // Show the message.
            // showMessage(data);

            // Emit event to local host.
            socket.emit('messageSent', data);

            message.value = "";
            message.focus();
        });
    }

    // Listen for events on the chatMessage.
    socket.on('messageUpdate', function(data) {
        // Show the message.
        showMessage(data);
    });
});



function showMessage(data) {
    var chatDisplay = document.querySelector('#chat-content .card-body');
    var newMessage = document.createElement('p');
    newMessage.className = 'chat-text';
    newMessage.innerHTML = '<strong>' + data.username + '</strong>: ' + data.message;

    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}