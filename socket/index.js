// author: DELL
// created:2018/3/29 16:48

const socketIO = require('socket.io');
const cookieParser = require('socket.io-cookie-parser')

function run(app) {
    let io = socketIO(app, {
        path: '/socket',
        serveClient: true,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: true
    });
    io.origins((origin, callback) => {
        callback(null, true);
    });
    io.use(cookieParser());
    io.use((socket, next) => {

        console.log(socket.request.cookies)
        next();
        // ...
    });

    io.on('connection', (socket) => {
        // console.log(socket);
        // ...

        socket.on('hello', (data) => {
            console.log(data);
            socket.emit('hello', data, 'reply');
        });
        socket.on('disconnect', (reason) => {
            // ...
            console.log(reason);
        });
    });


}

module.exports = {
    run
};
