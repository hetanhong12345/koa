// author: DELL
// created:2018/3/29 16:48

const socketIO = require('socket.io');
const cookieParser = require('socket.io-cookie-parser')
const redisClient = require('../utils/redis-client');
function run(app) {
    let io = socketIO(app, {
        path: '/socket',
        serveClient: true,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: true
    });
    io.use(cookieParser());
    io.use((socket, next) => {
        console.log(socket.request.cookies);

        if (socket.request.cookies.Authentication) {
            next();
        } else {
            next(new Error('Authentication error'));
        }


        // ...
    });

    io.on('connection', onConnect);

}

// io event connect
async function onConnect(socket) {
    console.log(socket.id);
    // ...
    let sessionId = socket.request.cookies.Authentication;
    let userInfo = await redisClient.hgetall(sessionId);
    let {mobile} = userInfo;
    redisClient.set('socket' + mobile, socket.id);
    socket.on('message', async (data) => {
        console.log(data);
        let {to} = data;
        if (!to) {
            socket.emit('message', 'to should not be  none', 'reply');
            return false;
        }
        let socketID = await  redisClient.get('socket' + to);
        if (socketID) {
            socket.to(socketID).emit('message', data.msg, 'reply');
        }

    });
    socket.on('disconnect', (reason) => {
        console.log(reason);
    });
}

module.exports = {
    run
};
