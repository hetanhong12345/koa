/**
 * Created by DELL on 2018/2/8.
 */
const Router = require('koa-router');
const trade = new Router();
const loginRequired = require('../utils/login-required');
const tradeController = require('../controllers/trade');

trade.use(loginRequired());
trade.get('/billList', async (ctx) => {
    return tradeController.billList(ctx);
});
trade.post('/recharge', async (ctx) => {
    return tradeController.recharge(ctx);
});
trade.post('/withdraw', async (ctx) => {
    return tradeController.withdraw(ctx);
});
trade.post('/transfer', async (ctx) => {
    return tradeController.transfer(ctx);
});

module.exports = trade;
