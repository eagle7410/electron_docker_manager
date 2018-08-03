
class SocketServer {
	constructor (window) {
		this.drive = window.webContents;
	}

	emit (event, data) {
		this.drive.send(event, data);
	}
}

module.exports = SocketServer;
