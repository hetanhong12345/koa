/**
 * Created by DELL on 2018/2/7.
 */
const bookshelf = require('../utils/bookshelf');
const Token = bookshelf.Model.extend({
    hasTimestamps: true,
    tableName: 'tokens',
    constructor: function () {
        bookshelf.Model.apply(this, arguments);
    }
});
module.exports = Token;
