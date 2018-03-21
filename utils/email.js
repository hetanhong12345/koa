/*
  author:hth
  created date:2018/2/26
  description:xxx
*/
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.sina.cn',
    secure: true,
    auth: {
        user: '13720057698@sina.cn',//axtsqknhhldxbbcg
        pass: 'hxx123456'  //rfwcyjfspflfbeef
    }
});
module.exports = {
    transporter
};
