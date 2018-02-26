/**
 * Created by DELL on 2017/11/24.
 */
const dateFormat = require('dateformat');
const func = {};
func.createRandomString = (len = 16) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = possible.length;
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * length));
    }

    return text;
};
func.createBillNumber = () => {
    let date = new Date();
    return dateFormat(date, 'yyyy mm dd HH MM ss').replace(/\s/g, '') + func.createRandomString(4);
};
func.isMobile = (mobile = '') => {
    let reg = /^1[3|4|5|6|7|8|9]\d{9}/;
    return reg.test(mobile);
};
module.exports = func;
