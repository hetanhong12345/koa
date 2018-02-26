exports.up = async function (knex, Promise) {

    await knex.schema.createTable('bills', table => {
        table.increments('id').primary();
        table.integer('type').notNullable().comment('账单类型 1:c充值，2：提现：3转入，4：转出，5：购买...');// 账单类型 1:c充值，2：提现：3转入，4：转出，5：购买...
        table.string('user_uuid').notNullable(); // 用户id
        table.float('amount', 14, 4).notNullable();// 交易金额
        table.string('number').unique().notNullable().comment('账单编号'); //账单编号
        table.string('description').comment('账单描述');
        table.string('other_uuid'); //转账对方uuid
        table.string('product_id'); //购买的产品id
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTable('bills');
};
