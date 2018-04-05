/**
 * Created by DELL on 2018/2/8.
 */
const bookshelf = require('../utils/bookshelf');
const func = require('../utils/func');


const Bill = bookshelf.Model.extend({
    tableName: 'bills',
    constructor: function () {
        bookshelf.Model.apply(this, arguments);
        this.on('creating', (model, attrs, options) => {
            model.set('number', func.createBillNumber());
        });
    }
});
module.exports = Bill;
