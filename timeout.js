/**
 * Created by DELL on 2018/1/15.
 */
// test
const axios = require('axios');
axios({
    url: 'http://koa-dev.zj-hf.cn/user/login',
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'http://kingold-dev.zj-hf.cn'
    },
    withCredentials: true,
    data: 'mobile=13720057698&password=hxx123456'
}).then(res => {
    console.log(res.headers);
    return axios({
        url: 'http://koa-dev.zj-hf.cn/user/userInfo',
        withCredentials: true,
    }).then(res => {
        console.log(res.data);
    })
})
