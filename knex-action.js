/**
 * Created by hekk on 2017/4/26.
 */
const knex = require('knex');
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(NODE_ENV);
const knexflie = require('./knexfile')[NODE_ENV];
const knexConfig = knex(knexflie);
module.exports = knexConfig;