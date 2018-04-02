/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const router = new Router();
const user = require('./user');
const file = require('./file');
const trade = require('./trade');
const middlewares = require('../middlewares')

const init = (app) => {
    // add cors middleware
    app.use(middlewares.cors());
    // add result  middleware
    app.use(middlewares.result());
    // 装载所有子路由
    router.use('/user', user.routes(), user.allowedMethods());
    router.use('/file', file.routes(), file.allowedMethods());
    router.use('/trade', trade.routes(), trade.allowedMethods());
    //  加载路由中间件
    app.use(router.routes()).use(router.allowedMethods());
}
module.exports = {
    init
};
