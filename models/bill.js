/**
 * Created by DELL on 2018/2/8.
 */
const bs = require('../bs');
const func = require('../utils/func');


const Bill = bs.Model.extend({
    tableName: 'bills',
    constructor: function () {
        bs.Model.apply(this, arguments);
        this.on('creating', (model, attrs, options) => {
            model.set('number', func.createBillNumber());
        });
    }
});
module.exports = Bill;
