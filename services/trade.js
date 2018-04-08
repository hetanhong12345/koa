const Account = require('../models/account');
const Bill = require('../models/bill');
const User = require('../models/user');
const bookshelf = require('../utils/bookshelf');
const trade = {};
// 交易记录
trade.billList = async (data) => {

    let {uuid, page, pageSize} = data;
    let bills = await new Bill()
        .query(qb => {
            qb.where('user_uuid', uuid)
                .column('amount', 'created_at', 'number', 'type')
                .orderBy('created_at', 'desc');
        })
        .fetchPage({page, pageSize});
    return {
        list: bills.models,
        pagination: bills.pagination
    };
};
// 充值
trade.recharge = async (data) => {
    let {uuid, amount} = data;
    return bookshelf.transaction(async (trx) => {
        let bill = new Bill({user_uuid: uuid});
        bill.set('type', 1);
        bill.set('description', '充值');
        bill.set('amount', amount);
        await bill.save(null, {transacting: trx}); // 插入一条充值记录

        let ac = await  new Account({user_uuid: uuid}).fetch();
        if (!ac) {
            return {
                code: 400,
                msg: 'user has not opened account'
            };

        }
        amount = parseFloat(amount) + parseFloat(ac.get('amount'))

        // 更新账户余额
        return await ac.save({amount}, {transacting: trx, patch: true});

    });
};
// 提现
trade.withdraw = async (data) => {
    let {uuid, amount} = data;
    return bookshelf.transaction(async (trx) => {
        let ac = await  new Account({user_uuid: uuid}).fetch();
        // 未开户
        if (!ac) {
            return {
                code: 400,
                msg: 'user has not opened account'
            };
        }
        // 余额不足
        if (parseFloat(amount) > parseFloat(ac.get('amount'))) {
            return {
                code: 400,
                msg: 'account amount is less than withdraw amount'
            };
        }
        let bill = new Bill({user_uuid: uuid});
        bill.set('type', 2);
        bill.set('description', '提现');
        bill.set('amount', amount);
        await bill.save(null, {transacting: trx}); // 插入一条提现记录
        amount = parseFloat(ac.get('amount')) - parseFloat(amount)
        // 更新账户余额
        return await ac.save({amount}, {transacting: trx, patch: true});
    });
};
// 转账
trade.transfer = async (data) => {

    let {uuid, mobile, amount} = data
    return bookshelf.transaction(async (trx) => {
        let ac = await new Account({user_uuid: uuid}).fetch();
        // 未开户
        if (!ac) {
            return {
                code: 1,
                msg: 'user has not opened account'
            };
        }
        // 余额不足
        if (parseFloat(amount) > parseFloat(ac.get('amount'))) {
            return {
                code: 2,
                msg: 'account amount is less than transfer amount'
            };
        }
        let other = await new User({mobile}).fetch();
        // 对方账户不存在
        if (!other) {
            return {
                code: 3,
                msg: 'other user is not exsit'
            };
        }
        let otherUuid = other.get('uuid');
        let otherAc = await  new Account({'user_uuid': otherUuid}).fetch();
        // 对方未开户
        if (!otherAc) {
            return {
                code: 3,
                msg: 'other user has not open account'
            };
        }
        let selfAmount = parseFloat(ac.get('amount')) - parseFloat(amount);
        let otherAmount = parseFloat(otherAc.get('amount')) + parseFloat(amount);


        // 对方账户增加余额

        await otherAc.save({amount: otherAmount}, {transacting: trx, patch: true});

        // 自己的账单增加一条转出记录
        let selfBill = new Bill({user_uuid: uuid});
        selfBill.set('type', 4);
        selfBill.set('description', '转出');
        selfBill.set('amount', amount);
        selfBill.set('other_uuid', otherUuid);
        await selfBill.save(null, {transacting: trx});

        // 对方账户增加一条转入记录
        let otherBill = new Bill({user_uuid: otherUuid});
        otherBill.set('type', 3);
        otherBill.set('description', '转入');
        otherBill.set('amount', amount);
        otherBill.set('other_uuid', uuid);
        await otherBill.save(null, {transacting: trx});

        // 自己账户减掉余额
        return ac.save({amount: selfAmount}, {transacting: trx, patch: true});
    });
};
module.exports = trade;
