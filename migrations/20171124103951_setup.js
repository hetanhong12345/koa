exports.up = async function (knex, Promise) {
    // users
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.integer('status').defaultTo(0); // 0：注册用户，1：已开户
        table.string('mobile').unique().notNullable();
        table.string('uuid').unique().notNullable();
        table.string('user_name').nullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    //accounts
    await knex.schema.createTable('accounts', table => {
        table.increments('id').primary()
        table.string('user_uuid').unique().notNullable();
        table.float('amount', 14, 4).defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    // tokens
    await knex.schema.createTable('tokens', table => {
        table.increments('id').primary()
        table.string('user_uuid').unique().notNullable();
        table.string('session').unique().notNullable();
        table.integer('platform').defaultTo(0); // 0 :pc ,1:mobile;2:app
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    // logs
    await knex.schema.createTable('logs', logs => {
        logs.increments('id').primary();
        logs.string('user_uuid').notNullable();
        logs.foreign('user_uuid').references('uuid').inTable('users');
        logs.string('type');
        logs.text('content')
        logs.timestamp('created_at').defaultTo(knex.fn.now());

    });


};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTable('logs');
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('accounts');
    await knex.schema.dropTable('tokens');

};
