/**
 * Created by DELL on 2018/2/7.
 */
const bs = require('../bs');
const Account = bs.Model.extend({
    hasTimestamps: true,
    tableName: 'accounts',
    constructor: function () {
        bs.Model.apply(this, arguments);
    }
});
module.exports = Account;
