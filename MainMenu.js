const electron      = require('electron');
const Menu          = electron.Menu;

class MainMenu {
	static addTo (app) {
		// Create the Application's main menu
		const template = [
			{
				label: "Application",
				submenu: [
					{ label: "Quit", accelerator: "Command+Q", click: () => app.quit() }
				]
			}, {
				label: "Edit",
				submenu: [
					{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
					{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
					{ type: "separator" },
					{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
					{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
					{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
					{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
				]
			}
		];

		Menu.setApplicationMenu(Menu.buildFromTemplate(template));
	}
}

module.exports = MainMenu;
