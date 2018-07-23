const {dialog} = require('electron');
const {appName} = require('../constants/app');

class FileSystemDialog {
	static saveFileTo (window) {
		return new Promise((ok)=> {
			dialog.showSaveDialog(window, {title : appName}, ok)
		});

	}
	static openFileFrom (window) {
		return new Promise((ok)=> {
			dialog.showOpenDialog(window, {
				title : appName,
				filters : [
					{name : 'Tar atchive', extensions : ['tar']},
					{name : 'All files', extensions : ['*']},
				]
			}, ok)
		});

	}
}
module.exports = FileSystemDialog;
