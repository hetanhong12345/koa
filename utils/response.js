/**
 * Created by DELL on 2017/11/24.
 */
/*
 对response进行封装
 处理可发生的异常情况
 * */
let response = (service) => {
    return async (ctx) => {
        try {
            let data = await service(ctx);
            ctx.body = {
                code: 200,
                data,
                msg: 'ok'
            }
        }
        catch (err) {
            if (err.name === 'CustomError') {
                ctx.body = {
                    code: err.code,
                    msg: err.message
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: err.message || err
                }
            }

        }
    }
};
module.exports = response;
