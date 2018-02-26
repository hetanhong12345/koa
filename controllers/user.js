/*
*
* author:hth
* created date :2018-02-11
* */
const Token = require('../models/token');
const Redis = require('../utils/redis-client');
const uuidV4 = require('uuid/v4');
const userService = require('../services/user');
const func = require('../utils/func');

const user = {};
const cookieProps = {
    domain: 'zj-hf.cn',  // 写cookie所在的域名
    maxAge: 60 * 60 * 1000, // cookie有效时长
    httpOnly: true,  // 是否只用于http请求中获取
    overwrite: false  // 是否允许重写
};
user.register = async (ctx) => {
    let {body} = ctx.request;
    let {mobile, password, userName} = body;
    let user_name = userName || '';
    if (!mobile || !password) {
        return {
            code: 400,
            msg: 'arguments error'
        };
    }
    if (!func.isMobile(mobile)) {
        return {
            code: 7,
            msg: 'incorrect mobile'
        };
    }
    let userInfo = await userService.register({mobile, password, user_name});
    if (userInfo.code == 402) {
        return {
            code: 402,
            msg: 'this mobile has registered'
        };
    }
    userInfo = userInfo.toJSON();
    let sessionId = uuidV4();
    updateSession(userInfo.uuid, sessionId);
    ctx.cookies.set('koa_session', sessionId, cookieProps);
    Redis.hmset(sessionId, userInfo);
    return userInfo;
};
user.login = async (ctx) => {
    let {body} = ctx.request;
    let {mobile, password} = body;
    if (!mobile || !password) {
        return {
            code: 400,
            msg: 'arguments error'
        };
    }
    let userInfo = await userService.login({mobile});
    if (!userInfo) {
        return {
            code: 402,
            msg: 'user is not exist'
        };
    }
    if (password != userInfo.get('password')) {
        return {
            code: 403,
            msg: 'password is incorrect'
        };
    }
    userInfo = userInfo.toJSON();
    let sessionId = uuidV4();
    let {uuid} = userInfo;
    updateSession(uuid, sessionId);
    ctx.cookies.set('koa_session', sessionId, cookieProps);
    Redis.hmset(sessionId, userInfo, 'EX', 60 * 60 * 1);
    return userInfo;
};
user.logout = async (ctx) => {
    let session = ctx.cookies.get('koa_session');
    Redis.del(session);
    let logoutCookie = {...cookieProps};
    logoutCookie.maxAge = 0;
    ctx.cookies.set('koa_session', '', logoutCookie);
    return 'ok';
};
user.userInfo = async (ctx) => {
    return ctx.userInfo;
};

user.openAccount = async (ctx) => {
    let {userInfo} = ctx;
    if (userInfo.status == 1) {
        return {
            code: 403,
            msg: 'account has already opened'
        };
    }
    let info = await userService.openAccount(userInfo.uuid);
    // 更新redis 用户信息
    info = info.toJSON();
    let sessionId = ctx.cookies.get('koa_session');
    Redis.hmset(sessionId, info, 'EX', 60 * 60 * 1);
    return info;
};

/*
 更新用户session
 删除redis中旧的 用户信息
 * */
function updateSession(uuid, sessionId) {
    return new Token({user_uuid: uuid}).fetch()
        .then(token => {
            if (token) {
                let session = token.get('session');
                Redis.del(session);
                token.set('session', sessionId);
                return token.save();
            }
            return false;
        }).then(token => {
            if (!token) {
                token = new Token();
                token.set('platform', 1);
                token.set('user_uuid', uuid);
                token.set('session', sessionId);
                return token.save();
            }
        });
};
module.exports = user;
