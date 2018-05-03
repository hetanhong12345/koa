// author: DELL
// created:2018/4/3 15:48
const http = require('http');
const app = require('./app');
const socket = require('./socket');

const server = http.createServer(app.callback());
socket.run(server);

// start server at port 3000
const port = parseInt(process.env.PORT || '3100', 10);
server.listen(port, () => {
    console.log('koa application  is starting at port 3100')
});
