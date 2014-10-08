var home = require('./controllers/home');

function routes(app) {
	app.get('/' , home.getIndex);
	app.post('/emission', home.postEmission);
}

module.exports = routes;