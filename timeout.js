/**
 * Created by DELL on 2018/1/15.
 */
var canJump = function (nums) {
    var len = nums.length;
    if (len <= 1) {
        return true
    }
    if (nums[0] == 0) {
        return false
    }
    var obj = {
        index: 0,
        value: nums[0]
    }
    for (var i = 1; i < len; i++) {
        if (i == len - 1) {
            return true
        }
        obj.value--;
        var num = nums[i];
        if (num > obj.value) {
            obj.value = num;
            obj.index = i;
        }
        if (obj.value <= 0 && num == 0) {

            return false
        }
    }
    return true;
};
