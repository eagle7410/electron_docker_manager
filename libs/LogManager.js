const fs = require('fs-extra');

const PATH_LOGS = `${__dirname}/../logs`;
const PATH_CONTAINERS_PORTS_MAP = `${PATH_LOGS}/container-port-map.json`;
const PATH_IMAGES_PORTS_MAP = `${PATH_LOGS}/image-port-map.json`;


class LogManager {
	static init() {
		if (!fs.pathExistsSync(PATH_LOGS)) {
			fs.mkdirsSync(PATH_LOGS);
			fs.writeJsonSync(PATH_CONTAINERS_PORTS_MAP, {}, {spaces : '\t'});
			fs.writeJsonSync(PATH_IMAGES_PORTS_MAP, {}, {spaces : '\t'});
		}
	}

	static containersLabelPorts () {
		return fs.readJson(PATH_CONTAINERS_PORTS_MAP);
	}

	static containersLabelPortsUpdate(labelPorts) {
		return fs.writeJson(PATH_CONTAINERS_PORTS_MAP, labelPorts, {spaces : '\t'});
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

}

module.exports = LogManager;
