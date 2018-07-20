const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Server        = require('./Server');
const MainMenu      = require('./MainMenu');

let isDev = false;

const includes = async () => {

	try {
		//~ Dev setting
		isDev = true;

		const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

		await installExtension(REACT_DEVELOPER_TOOLS);
		await installExtension(REDUX_DEVTOOLS);

		//~ End dev setting

		let mainWindow = new BrowserWindow({});
		mainWindow.maximize();

		await Server.run(mainWindow, isDev);

		//~ Dev setting

		mainWindow.toggleDevTools();

		//~ End dev setting

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
