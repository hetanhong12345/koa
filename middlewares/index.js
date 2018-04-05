// author: DELL
// created:2018/4/2 15:42


const redisClient = require('../utils/redis-client');

const cors = () => {
    return async (ctx, next) => {
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
        return next();
    }
};

const result = () => {
    return async (ctx, next) => {
        // warp return data
        let response = (data) => {
            if (data && data.code && data.msg) {
                return data;
            }
            return {code: 200, data, msg: 'ok'};
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

    }
};

const loginRequired = () => {
    return async (ctx, next) => {
        let session = ctx.cookies.get('Authentication');
        if (!session) {
            return {code: 401, msg: 'need login'};
        }
        let userInfo = await redisClient.hgetall(session);
        if (!userInfo) {
            return {
                code: 401,
                msg: 'need login , the account is replaced'
            };
        }
        ctx.userInfo = userInfo;
        return next();
    };
}
const page404 = () => {
    return async (ctx) => {
        ctx.body = {code: 404, msg: 'not found'};
    }
};
module.exports = {
    cors,
    result,
    loginRequired,
    page404
};

