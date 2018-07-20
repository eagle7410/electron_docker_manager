const electron    = require('electron');
const ipcRenderer = electron.ipcMain;
const send        = require('./libs/send');

const listen = (action, handel) => {
	ipcRenderer.on(action, (event, arg) => {
		handel(event.sender, `${action}-response`, arg);
	});
};

const listeners = arConfig => {
	arConfig.map(group => group.config().map(conf => {
		const type = conf.type || send.reqTypes.get;
		listen(`${type.toLowerCase()}->${conf.route}`, conf.handler);
	}));
};


module.exports = {
	run: async (mainWindow) =>  {

		listeners([require('./listeners').setWindow(mainWindow)]);

		return true;
	}
};
