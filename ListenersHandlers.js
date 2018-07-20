const electron    = require('electron');
const ipcRenderer = electron.ipcMain;
const Send        = require('./libs/Send');
const RouteConfig = require('./RouteConfig');

let mainWindow    = null;
let _isDev        = false;
let arConfig      = [];

const methods = Send.methods();

class ListenersHandlers {

	static setWindow(window) {
		mainWindow = window;

		return this;
	}

	static listen (action, handel) {
		let onAction = (event, arg) => handel(event.sender, `${action}-response`, arg);

		if (_isDev)
			onAction = (event, arg) => {
				console.log(`:: ${action} `, arg);
				handel(event.sender, `${action}-response`, arg);
			};

		ipcRenderer.on(action, onAction);
	}

	static _config2Listen (config) {
		this.listen(`${(config.method || methods.get).toLowerCase()}->${config.route}`, config.handler);
	}

	static apply (isDev) {
		_isDev = isDev;
		RouteConfig.get().map(this._config2Listen.bind(this));
	}
}

module.exports = ListenersHandlers;
