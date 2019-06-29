const ipcRenderer = window.ipcRenderer;

class SocketClient {
	constructor () {
		this.drive = ipcRenderer;
	}

	on (event, handler) {
		this.drive.on(event, (event, data) => handler(data));
	}
}

module.exports = SocketClient;
