const querystring = require("querystring");
const request = require('request-promise');
const crypto = require('crypto');

class DingServer {
    constructor() {    
        this.dingCrop = require('../config'); // node-config : 从config配置加载参数;  
    }

    async getJsapiSign (params) { 
        var plain = 
            'jsapi_ticket=' + params.ticket + 
            '&noncestr=' + params.nonceStr +
            '&timestamp=' + params.timeStamp + 
            '&url=' + params.url;
            console.log(plain);
        var sha1 = crypto.createHash('sha1');
        sha1.update(plain, 'utf8');
        return sha1.digest('hex'); 
    }

    async SignContent (ticket,paramUrl) { 
        var params = {
            ticket: ticket,
            nonceStr: Math.random().toString(36).substr(2), //随机生成字符串
            timeStamp: Math.round(new Date().getTime() / 1000),
            url: paramUrl
        };
        
        var mySignature = await this.getJsapiSign(params);
        var mySign = {
            agentId : this.dingCrop.agentId,
            corpId : this.dingCrop.corpId,
            timeStamp : params.timeStamp,
            nonceStr : params.nonceStr,
            signature : mySignature
        }
        return mySign; 
    }
};

module.exports = new DingServer();