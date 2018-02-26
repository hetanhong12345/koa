/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const router = new Router();
const user = require('./user');
const file = require('./file');
const trade = require('./trade');


const init = (app) => {
// add cors middleware
    app.use(async (ctx, next) => {
        let origin = ctx.get('Origin');
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Credentials', true);
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Max-Age', 24 * 60 * 60);
        let method = ctx.method;
        if ('OPTIONS' == method) {
            ctx.status = 204;
        }
        await  next();
    });
    // add suc/fail hand middleware
    app.use(async (ctx, next) => {

        // warp return data
        let response = (data) => {
            if (data && data.code && data.msg) {
                return data;
            }
            return {
                code: 200,
                data,
                msg: 'ok'
            };
        }

        let suc = (data) => {
            if (!ctx.body) {
                ctx.body = response(data);
            }
        };
        let fail = (err) => {
            ctx.body = {code: 500, msg: err.message || err};
        };
        return next().then(suc, fail);

    });
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
