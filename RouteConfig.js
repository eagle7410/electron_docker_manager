const Send             = require('./libs/Send');
const Cmd              = require('./libs/Cmd');
const ConsoleParser    = require('./libs/ConsoleParser');
const timeout          = require('./libs/timeout');
const commands         = require('./constants/dockerCommand');
const FileSystemDialog = require('./libs/FileSystemDialog');
let windowMain = null;

const route = (route, handler, method) => ({
	route,
	method,
	handler : async (res, action, data) => {
		try {
			await handler(res, action, data);
		} catch (e) {
			console.error(e);
			Send.err(res, action, e.message ? e.message : e);
		}
	}
});

const config = [
	route('/container-commit', async (res, action, data) => {
		await Cmd.get(commands.containerToImage(data));
		const image = await ConsoleParser.getOneImageByRepositoryTag(data);

		Send.ok(res, action, {image});
	}),
	route('/path-open', async (res, action) => {
		const path = await FileSystemDialog.openFileFrom(windowMain);
		Send.ok(res, action, {path : path || null});
	}),
	route('/path-save', async (res, action) => {
		let path = await FileSystemDialog.saveFileTo(windowMain);

		if (!path.includes('.tar')) path += '.tar';

		Send.ok(res, action, {path : path || null});
	}),
	route('/container', async (res, action, data) => {

		const id = await Cmd.get(commands.containerCreate(data));

		let container = await ConsoleParser.getOneContainer(id.trim());

		Send.ok(res, action, container);
	}),

	route('/container-delete', async (res, action, data) => {
		await Cmd.get(commands.stop(data));
		await Cmd.get(commands.containerDelete(data));

		Send.ok(res, action);
	}),
	route('/container-rename', async (res, action, data) => {

		await Cmd.get(commands.stop(data));
		await Cmd.get(commands.containerRename(data));

		let container = await ConsoleParser.getOneContainer(data.id);

		Send.ok(res, action, {container});
	}),
	route('/container-toggle-run', async (res, action, data) => {
		await Cmd.get(commands.toggleRun(data));

		let container = await ConsoleParser.getOneContainer(data.id);

		Send.ok(res, action, {container})
	}),
	route('/init', async (res, action) => {
		let result = await Cmd.get(commands.version);
		let isDockerLoad = false;

		let response = {
			isNoDocker : !~result.indexOf('Docker version'),
		};

		if (response.isNoDocker)
			return Send.ok(res, action, response);

		let countTry = 0;

		while (!isDockerLoad && countTry < 10) {
			try {

				result = await Cmd.get(commands.info);
				isDockerLoad = !!result.indexOf('Docker Root Dir');

			} catch (e) {
				console.log('Docker not load');
			} finally {
				countTry++;
				if (!isDockerLoad) await timeout(400);
			}
		}

		response.isDockerLoad = isDockerLoad;

		response.dockerInfo = await ConsoleParser.getDockerInfo();

		Send.ok(res, action, response);
	})
];

class RouteConfig {
	static setWindowMain (window) {
		windowMain = window;

		return this;
	}
	static get () {
		return config;
	}
}

module.exports = RouteConfig;
