const ListenersHandlers = require('./ListenersHandlers');

class Server {
	static async run(mainWindow, isDev) {
		ListenersHandlers.setWindow(mainWindow).apply(isDev || false);
	}
}

module.exports = Server;

