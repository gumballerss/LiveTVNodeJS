var configTv = require('../config/tv');
var users = require('../lib/users');
var twitter = require('../lib/twitter');

exports.getIndex = function(req, res) {

	var userId;

	if (req.session.userId) {
		userId = req.session.userId;
	}
	else {
		userId = req.session.userId = users.addUser();
	}

	var tag = users.getTag(userId);

	if (tag.length) {
	 	twitter.streamRefresh(tag);

	}

	//render la page views / home / index .html
	res.render('home/index', {
		tv : configTv, 
		userId: userId
	});
};

exports.postEmission = function(req, res) {
 
 if (req.body.emission != "" ){
 	users.addEmission(req.session.userId, req.body.emission);
 }


	//redirige vers la home page
	res.redirect('/');
};