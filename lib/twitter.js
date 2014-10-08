

var configTwitter = require('../config/twitter');
var Twit = require('twit');
var T = new Twit({
    consumer_key:         configTwitter.consumerKey
  , consumer_secret:      configTwitter.consumerSecret
  , access_token:         configTwitter.accessToken
  , access_token_secret:  configTwitter.accessTokenSecret
});

var users = require('./users');
var stream;

exports.streamRefresh = function (tag) {
	if (stream) {
		stream.stop();
		stream = null;
	}
	stream = T.stream('statuses/filter', { track: tag, language: 'fr' });
	stream.on('tweet', function (tweet) {
		users.broadcast(tweet);
	});
}
