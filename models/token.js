/**
 * Created by DELL on 2018/2/7.
 */
const bs = require('../bs');
const Token = bs.Model.extend({
    hasTimestamps: true,
    tableName: 'tokens',
    constructor: function () {
        bs.Model.apply(this, arguments);
    }
});
module.exports = Token;
