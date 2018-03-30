// author: DELL
// created:2018/3/30 14:42
const user = {};
const User = require('../models/user');
user.getSession = async (mobile) => {
    return new User({mobile}).fetch({withRelated: 'token'}).then(user => user.related('token').toJSON());

};
module.exports = user;
