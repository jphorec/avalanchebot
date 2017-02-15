var _       = require('lodash'),
    request = require('request');


module.exports = function (avalanchebot) {
    avalanchebot.hear(/http/i, function (bot) {
        console.log(bot.envelope.room);
        var url = bot.match[0].input;
        console.log(url);
        /*var testUrl = message.match(/(http:[^\s]+)/);
        if (!testUrl) {
            testUrl = message.match(/(https:[^\s]+)/);
        }
        var onlyUrl = testUrl && testUrl[1];
        console.log("URL:" + onlyUrl);
        */
        if (url) {
            request({
                url: 'http://jphorec:password@slalom-avalanche.herokuapp.com/skibot/posts', //URL to hit
                method: 'PUT',
                //Lets post the following key/values as form
                json: {
                    title: url,
                    url: url
                }
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
                }
            });
        }
        return;

    });
};
