/**
 * Created by DELL on 2017/11/27.
 */
const bs = require('../bs');
const uuidV4 = require('uuid/v4');
const token = require('./token');
const User = bs.Model.extend({
    tableName: 'users',
    token: function () {
        return this.belongsTo(token, 'uuid', 'user_uuid');
    },
    constructor: function () {
        bs.Model.apply(this, arguments);
        this.on('creating', (model, attrs, options) => {
            model.set('uuid', uuidV4())
        });
        this.on('saving', (model, attrs, options) => {
            model.set('updated_at', new Date())
        });
    }
});
module.exports = User;
