/**
 * Created by DELL on 2018/1/19.
 */
const schedule = require('node-schedule');
let s = null;
function scheduleCronstyle() {
    s = schedule.scheduleJob('1-50 * * * * *', function () {
        console.log('scheduleCronstyle:' + new Date());
    });
}

scheduleCronstyle();
let then = new Date().getTime();
while (new Date().getTime() - then <= 6000) {

}

