const Send             = require('./libs/Send');
const Cmd              = require('./libs/Cmd');
const ConsoleParser    = require('./libs/ConsoleParser');
const timeout          = require('./libs/timeout');
const commands         = require('./constants/dockerCommand');
const FileSystemDialog = require('./libs/FileSystemDialog');
const LogManager       = require('./libs/LogManager');
let windowMain = null;

LogManager.init();

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
	route('/container-logs', async (res, action, data) => {
		const text = await Cmd.get(commands.containerLogLines(data));

		Send.ok(res, action, {text});
	}),

	route('/image-pull', async (res, action, data) => {
		await Cmd.get(commands.imagePull(data));
		const image = await ConsoleParser.getOneImageByRepositoryTag(data);

		Send.ok(res, action, {image});
	}),
	route('/image-edit-label-ports', async (res, action, data) => {
		await LogManager.imagesEditLabelPorts(data.id, data.labelPorts);
		Send.ok(res, action);
	}),
	route('/image-delete', async (res, action, data) => {
		await Cmd.get(commands.imageDelete(data));
		Send.ok(res, action);
	}),
	route('/image-save', async (res, action, data) => {
		await Cmd.get(commands.imageSave(data));
		Send.ok(res, action);
	}),
	route('/container-edit-label-ports', async (res, action, data) => {
		await LogManager.containersEditLabelPorts(data.id, data.labelPorts);
		Send.ok(res, action);
	}),
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
		let path = await FileSystemDialog.saveFileTo(windowMain) || null;

		if (path && !path.includes('.tar')) path += '.tar';

		Send.ok(res, action, {path });
	}),
	route('/container', async (res, action, data) => {

		let id = await Cmd.get(commands.containerCreate(data));
		id = id.trim();

		await LogManager.containersEditLabelPorts(id, data.portExternal);

		let container = await ConsoleParser.getOneContainer(id);
		container.LABEL_PORTS = data.portExternal;

		Send.ok(res, action, container);
	}),

	route('/container-delete', async (res, action, data) => {
		await Cmd.get(commands.stop(data));
		await Cmd.get(commands.containerDelete(data));
		await LogManager.containersDeleteLabelPorts(data.id);

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

		const attach = {
			containers : {
				id    : 'CONTAINER ID',
				ports : await LogManager.containersLabelPorts()
			},
			images : {
				id    : 'IMAGE ID',
				ports : await LogManager.imagesLabelPorts()
			}
		};

		for (let [from, data] of Object.entries(attach))
			response.dockerInfo[from] = response.dockerInfo[from].map(item => {
				item.LABEL_PORTS = data.ports[item[data.id]] || '';

				return item;
			});

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
