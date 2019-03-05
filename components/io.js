var io = require('socket.io')();


io.on('connection', function (socket) {

    socket.on('message', function(msg){
        io.emit('message', msg);
    });

});

module.exports = io;