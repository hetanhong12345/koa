/**
 * Created by DELL on 2018/1/15.
 */
// test
const axios = require('axios');

async function getBaidu() {
    return 1234;
    return axios({
        url: 'http://www.baidu.com',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'http://kingold-dev.zj-hf.cn'
        },
        withCredentials: true,

    }).then(res => {
        return res
    })
}

getBaidu()
    .then(res => {
        console.log(res);
    }).catch(err => {
    console.log(123);
})
