const APIError = require('../utils/rest').APIError;
const sign = require('../api/sign');

module.exports = {
    'POST /api/sign': async (ctx, next) => {
        var url = ctx.request.body.url;
        var content = await sign.getSign(url);  
        ctx.rest(content);        
    },
    'GET /api/token': async (ctx, next) => {
        var token = await sign.getToken();
        ctx.rest(token);
    }
};