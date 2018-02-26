/**
 * Created by DELL on 2018/2/7.
 */
const {createClient} = require('then-redis');
const RedisDB = createClient({
    host: 'localhost',
    port: 6379,
    db: 3
});
module.exports = RedisDB;
