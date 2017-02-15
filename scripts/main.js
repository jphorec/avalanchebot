var _       = require('lodash'),
    request = require('request');


module.exports = function (avalanchebot) {
    avalanchebot.hear(/http/i, function (bot) {
        console.log(bot.envelope.room);
        var message = bot.message;
        var url = message.text;

        var testUrl = url.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/);
        var testTitle = url.match(/<a [^>]+>([^<]+)<\/a>/);
        console.log(testUrl);
        var onlyUrl = testUrl && testUrl[0];
        var title = testTitle && testTitle[1];
        console.log("Title: " + title);

        console.log("URL:" + onlyUrl);

        if (onlyUrl && title) {
            request({
                url: 'http://jphorec:password@slalom-avalanche.herokuapp.com/skibot/posts', //URL to hit
                method: 'PUT',
                //Lets post the following key/values as form
                json: {
                    title: title,
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
