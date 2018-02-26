/**
 * Created by DELL on 2017/11/24.
 */
const Router = require('koa-router');
const user = new Router();
const userController = require('../controllers/user');
const loginRequired = require('../utils/login-required');

user.post('/register', async (ctx) => {
    return userController.register(ctx);
});
user.post('/login', async (ctx) => {
    return userController.login(ctx);
});

// auth identify  middleware
user.use(loginRequired());
user.post('/logout', async (ctx) => {
    return userController.logout(ctx);
});
user.get('/userInfo', async (ctx) => {
    return userController.userInfo(ctx);
});
user.post('/openAccount', async (ctx) => {
    return userController.openAccount(ctx);

});
module.exports = user;
