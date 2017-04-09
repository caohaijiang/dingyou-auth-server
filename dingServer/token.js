const querystring = require("querystring");
const request = require('request-promise');
const dingCrop = require('../config'); // node-config : 从config配置加载参数

var Token = (function () {
    var instance;
    var last = 0;
    var access_Token;
    function init() {
        return {
            getToken: async function () {
                var now = new Date().getTime();//now是毫秒单位                
                if (now - last > 60 * 30 * 1000)
                {
                    var path = '/gettoken?' + querystring.stringify({            
                        corpid: dingCrop.corpId,
                        corpsecret: dingCrop.corpsecret
                    });

                    var result = JSON.parse(await request.get(dingCrop.apiUrl + path));

                    if (result.errcode===0)
                    {
                        access_Token = result.access_token;
                        last = now;
                        console.log('new token:' + access_Token);
                        return access_Token;
                    }
                    else
                    {
                        return result.errmsg;
                    }
                }
                else
                {
                    console.log('cache token:' + access_Token);
                    return access_Token;
                }
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

module.exports = Token;
