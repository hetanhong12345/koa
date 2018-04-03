/**
 * Created by DELL on 2017/11/24.
 */
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const app = new Koa();


// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static';
app.use(static(path.join(__dirname, staticPath)));

// 使用ctx.body解析中间件
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


// init app  routes ;
const routes = require('./routes');
routes.init(app);


// catch 404 error ;
const {page404} = require('./middlewares');
app.use(page404());


module.exports = app;
