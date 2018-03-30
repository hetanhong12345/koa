// author: DELL
// created:2018/3/29 16:48

const socketIO = require('socket.io');
const cookieParser = require('socket.io-cookie-parser')
const Redis = require('../utils/redis-client');
const user = require('./user');

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
    let userInfo = await Redis.hgetall(sessionId);
    userInfo.socketID = socket.id
    Redis.hmset(sessionId, userInfo);
    socket.on('message', async (data) => {
        console.log(data);
        let {to} = data;
        if (!to) {
            socket.emit('message', 'to should not be  none', 'reply');
            return false;
        }
        let userSession = await  user.getSession(to);
        console.log('-------------------');
        console.log(userSession);

        if (userSession) {
            let session = userSession.session;
            let otherInfo = await Redis.hgetall(session);
            let {socketID} = otherInfo;
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
