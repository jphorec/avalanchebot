var _       = require('lodash'),
    request = require('request');


module.exports = function (avalanchebot) {
    avalanchebot.hear(/http/i, function (bot) {
        var debug = false;
        console.log(bot.envelope.room);
        var message = bot.message;
        var url = message.text;

        var testUrl = url.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/);
        var strongTitle = url.match(/(<a href="([^"]+)">([^<]+)<\/a>|<a href="([^"]+)"><strong>([^<]+)<\/strong><\/a>)/);
        var anchorTitle = url.match(/<a [^>]+>([^<]+)<\/a>/);
        var imageTag = url.match(/(<img src="([^"]+)"([^<]+)\/>)/);
        //console.log(testUrl);
        //console.log(noLinkyUrl);
        console.log("anchorTitle: " + anchorTitle);
        console.log("strongTitle: " + strongTitle);
        console.log("ImageTag: " + imageTag);
        var onlyUrl = testUrl && testUrl[0];
        var imageUrl = imageTag && imageTag[2];
        var title = anchorTitle && anchorTitle[1];
        if (!title) {
            title = strongTitle && strongTitle[5];
        }
        console.log("Title: " + title);
        console.log("Image: " + imageUrl);
        console.log("URL:" + onlyUrl);
        createDate = new Date().toISOString();
        if (onlyUrl && title) {
            if (!debug) {
                request({
                    url: 'http://jphorec:password@slalom-avalanche.herokuapp.com/skibot/posts', //URL to hit
                    method: 'PUT',
                    //Lets post the following key/values as form
                    json: {
                        title: title,
                        url: onlyUrl,
                        thumbnailUrl: imageUrl,
                        author: 'jphorec',
                        userId: 'J3SCeLpgDcS5RC9bT',
                        createdAt: createDate,
                        postedAt: createDate
                    }
                }, function(error, response, body){
                    if(error) {
                        console.log(error);
                    } else {
                        console.log(response.statusCode, body);
                    }
                });
            } else {
                console.log("should have sent request...");
            }
        }
        return;

    });
};
