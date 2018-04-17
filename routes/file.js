/**
 * Created by DELL on 2017/11/28.
 */
const Router = require('koa-router');
const file = new Router();
const koaBody = require('koa-body');
const fileController = require('../controllers/file');
//
file.post('/upload', koaBody({multipart: true}), async (ctx) => {
    return fileController.upload(ctx);
});
file.get('/download', async (ctx) => {
    return fileController.download(ctx);
})
module.exports = file;
