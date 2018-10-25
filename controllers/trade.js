/*
*
* author:hth
* created date :2018-02-12
* */
const func = require('../utils/func');
const tradeService = require('../services/trade');
const trade = {};

// 交易列表
trade.billList = async (ctx) => {
    let {userInfo} = ctx;
    let {uuid} = userInfo;
    let {query} = ctx.request;
    let pageSize = query.pageSize || 6;
    let page = query.page || 1;
    return tradeService.billList({uuid, page, pageSize});
};
// 充值
trade.recharge = async (ctx) => {
    let {userInfo} = ctx;
    let {body} = ctx.request;
    let {amount} = body;
    if (isNaN(Number(amount)) || amount <= 0) {
        return {
            code: 400,
            msg: 'amount is not a number'
        };
    }
    let {uuid} = userInfo;
    return tradeService.recharge({uuid, amount})
};
// 提现
trade.withdraw = async (ctx) => {
    let {userInfo} = ctx;
    let {body} = ctx.request;
    let {amount} = body;
    if (isNaN(Number(amount)) || amount <= 0) {
        return {
            code: 400,
            msg: 'amount is not a number'
        };

    }
    let {uuid} = userInfo;
    return tradeService.withdraw({uuid, amount})
};
//转账
trade.transfer = async (ctx) => {
    let {body} = ctx.request;
    let {amount, mobile} = body;
    if (!func.isMobile(mobile)) {
        return {
            code: 7,
            msg: 'incorrect mobile'
        };
    }
    if (isNaN(Number(amount)) || amount <= 0) {

        return {
            code: 5,
            msg: 'amount is not a number'
        };
    }
    let {userInfo} = ctx;

    let {uuid} = userInfo;
    if (mobile === userInfo.mobile) {
        return {
            code: 6,
            msg: 'can not transfer to yourself'
        };
    }
    // 未开户
    if (userInfo.status !== 1) {
        return {
            code: 1,
            msg: 'user has not opened account'
        };
    }
    return tradeService.transfer({uuid, mobile, amount});
};
module.exports = trade;
