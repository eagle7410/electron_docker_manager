const Send             = require('./libs/Send');
const Cmd              = require('./libs/Cmd');
const ConsoleParser    = require('./libs/ConsoleParser');
const timeout          = require('./libs/timeout');
const commands         = require('./constants/dockerCommand');
const FileSystemDialog = require('./libs/FileSystemDialog');
const fs               = require('fs-extra');

const PATH_LOGS = `${__dirname}/logs`;
const PATH_CONTAINERS_PORTS_MAP = `${PATH_LOGS}/container-port-map.json`;

if (!fs.pathExistsSync(PATH_LOGS)) {
	fs.mkdirsSync(PATH_LOGS);
	fs.writeJsonSync(PATH_CONTAINERS_PORTS_MAP, {}, {spaces : '\t'});
}

let windowMain = null;

const addToContainersPortsMap = async (id, data) => {
	let containersPortsMap = await fs.readJson(PATH_CONTAINERS_PORTS_MAP);
	containersPortsMap[id] = data;

	await fs.writeJson(PATH_CONTAINERS_PORTS_MAP, containersPortsMap, {spaces : '\t'});
}

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
	route('/image-save', async (res, action, data) => {
		await Cmd.get(commands.imageSave(data));
		Send.ok(res, action);
	}),
	route('/container-edit-label-ports', async (res, action, data) => {
		await addToContainersPortsMap(data.id, data.labelPorts);
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
		await addToContainersPortsMap(id, data.portExternal);

		let container = await ConsoleParser.getOneContainer(id);
		container.LABEL_PORTS = data.portExternal;

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

		const containersPortsMap = await fs.readJson(PATH_CONTAINERS_PORTS_MAP);

		response.dockerInfo.containers = response.dockerInfo.containers.map(container => {
			container.LABEL_PORTS = containersPortsMap[container['CONTAINER ID']] || '';

			return container;
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
