/**
 * Created by DELL on 2018/2/8.
 */

const Redis = require('./redis-client');

module.exports = () => {
    return async (ctx, next) => {
        let session = ctx.cookies.get('Authentication');
        if (!session) {
            return {
                code: 401,
                msg: 'need login'
            };
        }
        let userInfo = await Redis.hgetall(session);
        if (!userInfo) {
            return {
                code: 401,
                msg: 'need login , the account is replaced'
            };
        }
        ctx.userInfo = userInfo;
        return await next();
    };
};
