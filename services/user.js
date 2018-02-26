/**
 * Created by DELL on 2017/11/24.
 */
const User = require('../models/user');
const Account = require('../models/account');
const Redis = require('../utils/redis-client');
const uuidV4 = require('uuid/v4');
const bookshelf = require('../bs');

const cookieProps = {
    domain: 'zj-hf.cn',  // 写cookie所在的域名
    maxAge: 60 * 60 * 1000, // cookie有效时长
    httpOnly: true,  // 是否只用于http请求中获取
    overwrite: false  // 是否允许重写
};
const user = {};
user.register = async (data) => {
    let {mobile, password, user_name} = data;
    let users = await new User({mobile}).fetch()
    if (users) {
        return {
            code: 402,
            msg: 'this mobile has registered'
        };
    }
    return new User({mobile, password, user_name}).save();

};
user.login = async (data) => {
    let {mobile} = data;
    return new User({mobile}).fetch();

};

user.openAccount = async (uuid) => {
    return bookshelf.transaction(async (trx) => {
        let account = new Account({user_uuid: uuid});
        await account.save(null, {transacting: trx});
        let user = await  new User({uuid: uuid}).fetch();
        user.set('status', 1);
        return user.save(null, {transacting: trx});
    });
};
module.exports = user;
