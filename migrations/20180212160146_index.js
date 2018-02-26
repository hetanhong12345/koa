exports.up = async function (knex, Promise) {
    // users
    await knex.schema.alterTable('users', table => {

        table.index('mobile', 'mobile_idx');
    });
};

exports.down = async function (knex, Promise) {
    // users
    await knex.schema.alterTable('users', table => {

        table.dropIndex('mobile', 'mobile_idx');
    });
};
