/**
 * Created by DELL on 2017/11/24.
 */

/*
 a custom error info class
 @params code msg
* */
class CustomError extends Error {
    constructor(code, msg) {
        super(msg);
        this.code = code;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}
module.exports = CustomError;
