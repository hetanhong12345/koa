/**
 * Created by DELL on 2017/11/24.
 */
const bookshelf = require('bookshelf');
const knex = require('./knex-action');
const bs = bookshelf(knex);
bs.plugin('registry'); // model register
bs.plugin('pagination'); // pagination
module.exports = bs;
