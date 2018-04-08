/**
 * Created by DELL on 2017/11/24.
 */
const User = require('../models/user');
const Account = require('../models/account');
const bookshelf = require('../utils/bookshelf');
const user = {};
user.register = async (data) => {
    let {mobile, password, user_name} = data;
    let users = await new User({mobile}).fetch();
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
        return user.save({status: 1}, {transacting: trx, patch: true});
    });
};
module.exports = user;
