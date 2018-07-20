const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const server        = require('./server-dev');

const includes = async () => {

	try {
		//~ Dev setting

		const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

		await installExtension(REACT_DEVELOPER_TOOLS);
		await installExtension(REDUX_DEVTOOLS);

		//~ End dev setting

		let mainWindow = new BrowserWindow({
			width  : 400,
			height : 820,
		});

		await server.run(mainWindow);

		//~ Dev setting

		mainWindow.maximize();
		mainWindow.toggleDevTools();

		//~ End dev setting

		mainWindow.loadURL('http://localhost:3000/');

		mainWindow.on('closed', () => {
			mainWindow = null;
			app.quit();
		});

		require('./menu-app').add(Menu, app);

	} catch (err) {
		console.log('Error: ', err);
	}
};

app.on('ready', includes);
