/*
*
* author:hth
* created date :2018-02-11
* */
const fs = require('fs');
const path = require('path');
const fileService = require('../services/file');
const file = {};
file.upload = async (ctx) => {
    let files = ctx.request.body.files;
    if (!files) {
        return {
            code: 400,
            msg: 'no files'
        };
    }
    return fileService.upload(files);
};
file.download = async (ctx) => {
    ctx.set('Content-type', 'application/octet-stream')
    ctx.set('Content-Disposition', 'attachment;filename=test.js')
    ctx.body = fileService.download()
};
module.exports = file
