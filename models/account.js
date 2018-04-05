/**
 * Created by DELL on 2018/2/7.
 */
const bookshelf = require('../utils/bookshelf');
const Account = bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'accounts',
    constructor: function () {
        bookshelf.Model.apply(this, arguments);
    }
});
module.exports = Account;
