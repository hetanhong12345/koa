/**
 * Created by DELL on 2018/2/7.
 */
const bs = require('../bs');
const Token = bs.Model.extend({
    tableName: 'tokens',
    constructor: function () {
        bs.Model.apply(this, arguments);
        this.on('saving', (model, attrs, options) => {
            model.set('updated_at', new Date())
        });
    }
});
module.exports = Token;
