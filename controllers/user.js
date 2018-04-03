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
const {transporter} = require('../utils/email');

const user = {};
const cookieProps = {
    // domain: 'zj-hf.cn',  // 写cookie所在的域名
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
    updateSession(userInfo.uuid, sessionId).then();
    ctx.cookies.set('Authentication', sessionId, cookieProps);
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
    updateSession(uuid, sessionId).then();
    ctx.cookies.set('Authentication', sessionId, cookieProps);
    Redis.hmset(sessionId, userInfo, 'EX', 60 * 60 * 1);
    return userInfo;
};
user.logout = async (ctx) => {
    let session = ctx.cookies.get('Authentication');
    Redis.del(session);
    let logoutCookie = {...cookieProps};
    logoutCookie.maxAge = 0;
    ctx.cookies.set('Authentication', '', logoutCookie);
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
    let sessionId = ctx.cookies.get('Authentication');
    Redis.hmset(sessionId, info, 'EX', 60 * 60 * 1);
    return info;
};
user.sendEmail = async () => {
    var mailOptions = {
        from: '"何大炮" <13720057698@sina.cn>',
        to: 'hetanhong@zj-inv.cn',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    return new Promise((resolve, reject) => {
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return reject('send email error');
            }
            resolve('Email sent: ' + info.response);

        });
    });
};

/*
 更新用户session
 删除redis中旧的 用户信息
 * */
async function updateSession(uuid, sessionId) {
    let token = await new Token({user_uuid: uuid}).fetch();
    if (token) {
        let session = token.get('session');
        Redis.del(session);
        return token.save({session: sessionId}, {patch: true});
    }
    token = new Token();
    return token.save({platform: 1, user_uuid: uuid, session: sessionId});
};
module.exports = user;
