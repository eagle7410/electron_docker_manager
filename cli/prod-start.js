const fs   = require('fs-extra');
const root = `${__dirname}/../`;
const ConsoleColorLog = require('console-color');
const log = new ConsoleColorLog();

const fileContentChange = async (pathRead, pathWrite, promiseWrite) => {
	let data = fs.readFileSync(pathRead, 'utf8');

	data =  await promiseWrite(data.toString());
	await fs.writeFile(pathWrite, data);
};

const createIndex = async () => {
	const transform = data => new Promise(
		write => {
			write(
				data.replace(/\/\/~\sdev([^~])+\/\/~\send(.*)\n/gi, '')
					.replace('mainWindow.loadURL(\'http://localhost:3000/\');', 'mainWindow.loadURL(`file://${__dirname}/html/index.html`);')
					.replace(/\n(\t){0,}\n/g, '\n')
			)

		});

	await fileContentChange(root + 'index-app-dev.js', root + 'index-app.js', transform);

	log.success('Index create is ok.');
};

const correctPackageJson = () => new Promise((ok, bad) => {
	const path = root + 'package.json';
	fs.readFile(path, 'utf8', (err,data) => {
		if (err) {
			log.error('correctPackageJson readFile bab', err);
			return bad();
		}

		data = data.toString()
			.replace(/"main"\: "index([^\n])+/, '"main": "index-app.js",');

		fs.writeFile(path, data, err => {
			if (err) {
				log.error('correctPackageJson writeFile bab', err);
				return bad();
			}

			log.success('correctPackageJson ok');
			return ok();
		});

	});
});

const clearLogFile = async () => {
	const transform = data => new Promise(write => write('This is log file\n'));

	await fileContentChange(root + 'libs/log.txt', root + 'libs/log.txt', transform);

	log.success('Clear log file is ok.');

};

void async function createProdStart() {
	try {
		await createIndex();
		await correctPackageJson();
		await clearLogFile();

		log.success('Success ...');

	} catch (e) {
		log.error('Fail', e);
	} finally {
		process.exit();
	}
}();
