# KOA

> koa project

## Build Setup
* install mysql

# install global
```bash
npm install -g knex
npm install -g pm2
```
# install dependencies
``` bash
npm install
```
# when development
``` bash
knex migrate:latest

pm2 start run.config.js --only dev
```
# production
```
knex migrate:latest --env production

pm2 start run.config.js --only production 
```

## knex 
* create knexfile
```bash 
knex init 
```
* create migrations

```bash 
knex migrate:make migrate name
```
* create/update table

```bash
knex migrate:latest --env env
```
* rollback table

```bash
knex migrate:rollback --env env
```
