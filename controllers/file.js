/*
*
* author:hth
* created date :2018-02-11
* */
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
module.exports = file
