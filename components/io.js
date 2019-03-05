var io = require('socket.io')();


io.on('connection', function (cn) {

    /*  socket.on('message', function(msg){
     io.emit('message', msg);
     });
     */

    cn.on('f',function (data) {
        switch(data.function){
            case'getStream':
                console.log(data)
                cn.join('STREAM_'+data.feed)
                break;
        }
    })
});

module.exports = io;