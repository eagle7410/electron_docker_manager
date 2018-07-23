const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Server        = require('./Server');
const MainMenu      = require('./MainMenu');
let isDev = false;
const includes = async () => {
	try {
		let mainWindow = new BrowserWindow({});
		mainWindow.maximize();

		await Server.run(mainWindow, isDev);

		mainWindow.loadURL('http://localhost:3000/');
		mainWindow.on('closed', () => {
			mainWindow = null;
			app.quit();
		});
		MainMenu.addTo(app);
	} catch (err) {
		console.log('Error: ', err);
	}
};
app.on('ready', includes);