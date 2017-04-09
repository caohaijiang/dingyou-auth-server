const dingserver = require('../dingServer');

var Token = require('../dingServer/token.js');
var Ticket = require('../dingServer/ticket.js');

module.exports = {
    getSign: async (data) => { 
        var token = await Token.getInstance().getToken(); 
        var ticket = await Ticket.getInstance(token).getTicket();
        var content_Result = await dingserver.SignContent(ticket,data);
        return content_Result;
    },
    getToken: async () => {
        var token = await Token.getInstance().getToken();
        return token;
    }
};