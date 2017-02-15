var _       = require('lodash'),
    request = require('request');


module.exports = function (avalanchebot) {
    avalanchebot.hear(/http/i, function (bot) {
        console.log(bot);
        console.log(bot.envelope.room);
        var message = bot.message;
        var url = message.text;

        var testUrl = url.match(/(http:[^\s]+)/);
        if (!testUrl) {
            testUrl = url.match(/(https:[^\s]+)/);
        }
        var onlyUrl = testUrl && testUrl[1];
        var rex = /(<([^>]+)>)/ig;
        onlyUrl = onlyUrl.replace(rex, "");
        console.log("URL:" + onlyUrl);

        if (onlyUrl) {
            request({
                url: 'http://jphorec:password@slalom-avalanche.herokuapp.com/skibot/posts', //URL to hit
                method: 'PUT',
                //Lets post the following key/values as form
                json: {
                    title: onlyUrl,
                    url: onlyUrl
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
