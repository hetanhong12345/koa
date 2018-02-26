// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        debug: true,
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'hxx123456',
            database: 'koa',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        }
    },

    test: {
        client: 'mysql',
        connection: {
            host: '47.93.42.46',
            user: 'zjht_admin',
            password: 'zjhttest',
            database: 'kingold_koa_test',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: '47.93.42.46',
            user: 'zjht_admin',
            password: 'zjhttest',
            database: 'kingold_koa',
            charset: 'utf8'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
