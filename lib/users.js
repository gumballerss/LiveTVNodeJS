var ids = 0;

var usersArray = [];

var users = {
	//Ajoute un utilisateur
	addUser: function() {
		var id = ++ids;
		usersArray[id] = { socket: null, tags: []};

		return id;
	},

	//Assigne un socket à un user
	setSocket: function(userId, socket) {
		usersArray[userId].socket = socket;
	},

	//Ajoute le tag d'une emission à un user
	addEmission: function(userId, tag) {
		console.log(usersArray[userId]);
		//Remplir le tableau avec un hashtag
		usersArray[userId].tags[0] = tag.toLowerCase();
	},

	//Transmettre les tweets au users selon leur tag
	broadcast: function(tweet) {
		var tag, client;
		
		//pour chaque user, comparer les hashtags du tweet avec 
		//les hashtags de l'user.
		for (var i = 0; i < usersArray.length; i++) {
			client = usersArray[i];
			if (!client) {
				continue;
			}

			for (var j = 0; j < tweet.entities.hashtags.length; j++) {
				tag = tweet.entities.hashtags[j].text;

				//Si ca correspond, envoyer/emit le tweet à l'user via websocket.
				if (client.tags.indexOf(tag.toLowerCase()) !== -1) {
					client.socket.emit('tweet', tweet);
					break;
				}
			} //end for hashtags
		} //end for userArray

	},

	getTag: function (userId) {
		return usersArray[userId].tags;
	}

}

module.exports = users;