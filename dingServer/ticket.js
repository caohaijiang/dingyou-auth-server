const querystring = require("querystring");
const request = require('request-promise');
const dingCrop = require('../config'); // node-config : 从config配置加载参数

var Ticket = (function () {
    var instance;
    var last = 0;
    var access_Ticket;
    function init(token) {
        return {
            getTicket: async function () {
                var now = new Date().getTime();//now是毫秒单位
                if (now - last > 60 * 30 * 1000)
                {
                    var path = '/get_jsapi_ticket?'  + querystring.stringify({            
                        type: 'jsapi',
                        access_token: token
                    });
                    var result= JSON.parse(await request.get(dingCrop.apiUrl + path));
                    if (result.errcode===0)
                    {
                        access_Ticket = result.ticket;
                        last = now;
                        console.log('new ticket:' + access_Ticket);
                        return access_Ticket;
                    }
                    else
                    {
                        return result.errmsg;
                    }
                }
                else
                {
                    console.log('cache ticket:' + access_Ticket);
                    return access_Ticket;
                }
            }
        };
    }

    return {
        getInstance: function (token) {
            if (!instance) {
                instance = init(token);
            }
            return instance;
        }
    };
})();

module.exports = Ticket;
