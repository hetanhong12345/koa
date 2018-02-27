/*
  author:hth
  created date:2018/2/26
  description:xxx
*/
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    //secureConnection: true, // use SSL
    port: 465,
    secure: true,
    auth: {
        user: '543039822@qq.com',//axtsqknhhldxbbcg
        pass: 'jmexvobfmfbbbfeh'  //rfwcyjfspflfbeef
    }
});
module.exports = {
    transporter
};
