var _       = require('lodash'),
    request = require('request');


module.exports = function (avalanchebot) {
    avalanchebot.hear(/badjder/i, function (bot) {
        console.log(bot);
        /*var message = bot.message;
        var testUrl = message.match(/(http:[^\s]+)/);
        if (!testUrl) {
            testUrl = message.match(/(https:[^\s]+)/);
        }
        var onlyUrl = testUrl && testUrl[1];
        console.log(onlyUrl);
        */
        bot.send("howdy");
        return;

    });
};
