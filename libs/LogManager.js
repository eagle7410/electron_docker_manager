const fs = require('fs-extra');

const PATH_LOGS = `${__dirname}/../logs`;
const PATH_CONTAINERS_PORTS_MAP = `${PATH_LOGS}/container-port-map.json`;
const PATH_IMAGES_PORTS_MAP = `${PATH_LOGS}/image-port-map.json`;
const PATH_COMMENTS = `${PATH_LOGS}/comments.json`;

let comments = null;
class LogManager {
	static init() {
		if (!fs.pathExistsSync(PATH_LOGS)) {
			fs.mkdirsSync(PATH_LOGS);
			fs.writeJsonSync(PATH_CONTAINERS_PORTS_MAP, {}, {spaces : '\t'});
			fs.writeJsonSync(PATH_IMAGES_PORTS_MAP, {}, {spaces : '\t'});
			fs.writeJsonSync(PATH_COMMENTS, { "containers" : {}, "images" : {} }, {spaces : '\t'});
		}
	}

	static async loadFrom(path) {
		const {
			containersPorts,
			imagesPorts,
			comments
		} = await fs.readJson(path);

		await fs.writeJson(PATH_CONTAINERS_PORTS_MAP, containersPorts, {spaces : '\t'});
		await fs.writeJson(PATH_IMAGES_PORTS_MAP, imagesPorts, {spaces : '\t'});
		await fs.writeJson(PATH_COMMENTS, comments, {spaces : '\t'});

		return true;
	}
	static async saveTo(path) {
		const containersPorts = await fs.readJson(PATH_CONTAINERS_PORTS_MAP);
		const imagesPorts = await fs.readJson(PATH_IMAGES_PORTS_MAP);
		const comments = await fs.readJson(PATH_COMMENTS);

		await fs.writeJson(path, {containersPorts, imagesPorts, comments}, {spaces : '\t'});

		return true;
	}

	static commentsLoad() {
		return fs.readJson(PATH_COMMENTS);
	}

	static async commentsImages() {
		if (!comments) comments = await this.commentsLoad();

		return comments.images
	}

	static async commentsContainers() {
		if (!comments) comments = await this.commentsLoad();

		return comments.containers;
	}

	static async commentSave({type, id, comment}) {
		if (!comments) comments = await this.commentsLoad();
		comments[type][id] = comment;

		return fs.writeJson(PATH_COMMENTS, comments, {spaces : '\t'});
	}

	static imagesLabelPorts () {
		return fs.readJson(PATH_IMAGES_PORTS_MAP);
	}

	static containersLabelPorts () {
		return fs.readJson(PATH_CONTAINERS_PORTS_MAP);
	}

	static containersLabelPortsUpdate(labelPorts) {
		return fs.writeJson(PATH_CONTAINERS_PORTS_MAP, labelPorts, {spaces : '\t'});
	}

	static imagesLabelPortsUpdate(labelPorts) {
		return fs.writeJson(PATH_IMAGES_PORTS_MAP, labelPorts, {spaces : '\t'});
	}

	static getId(id) {
		return id.slice(0, 12);
	}
	static async containersDeleteLabelPorts (id) {
		let containersPortsMap = await this.containersLabelPorts();
		delete containersPortsMap[this.getId(id)];

		return await this.containersLabelPortsUpdate(containersPortsMap)
	}

	static async containersEditLabelPorts (id, labelPorts) {
		let containersPortsMap = await this.containersLabelPorts();
		containersPortsMap[this.getId(id)] = labelPorts;

		return await this.containersLabelPortsUpdate(containersPortsMap)
	}

	static async imagesEditLabelPorts (id, labelPorts) {
		let portsMap = await this.imagesLabelPorts();
		portsMap[this.getId(id)] = labelPorts;

		return await this.imagesLabelPortsUpdate(portsMap);
	}
}

module.exports = LogManager;
