const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class SocketClient {
	constructor () {
		this.drive = ipcRenderer;
	}

	on (event, handler) {
		this.drive.on(event, (event, data) => handler(data));
	}
}

module.exports = SocketClient;
