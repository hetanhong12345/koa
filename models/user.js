/**
 * Created by DELL on 2017/11/27.
 */
const bookshelf = require('../utils/bookshelf');
const uuidV4 = require('uuid/v4');
const token = require('./token');
const User = bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'users',
    token: function () {
        return this.belongsTo(token, 'uuid', 'user_uuid');
    },
    constructor: function () {
        bookshelf.Model.apply(this, arguments);
        this.on('creating', (model, attrs, options) => {
            model.set('uuid', uuidV4())
        });
    }
});
module.exports = User;
