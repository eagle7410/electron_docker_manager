const Cmd           = require('./Cmd');
const commands      = require('../constants/dockerCommand');

class ConsoleParser {
	static dockerOut (text, handlerLine) {
		let res = text
			.trim()
			.split('\n')
			.map(line =>
				line.replace(/(\s){3,}/g, '#|#')
					.split('#|#')
					.map(column => column.trim())
			);

		let header = res.shift();

		res = res.map(row => handlerLine(row, header));

		return res;
	}

	static async containerStats(id) {
		const handlerLine = (row, header) => {
			let obj = {};

			row.map((val, num) => obj[header[num]] = val);

			return obj;
		};

		return this.dockerOut(await Cmd.get(commands.containerStats({id})), handlerLine);
	}

	static async allContainers() {
		const handlerLine = (row, header) => {
			let obj = {};

			row.map((val, num) => obj[header[num]] = val);

			if (!obj.NAMES) {
				obj.NAMES = obj.PORTS;
				obj.PORTS = '';
			}

			return obj;
		};

		return this.dockerOut(await Cmd.get(commands.containersAll), handlerLine);
	}


	static async allImages() {
		const handlerLine = (row, header) => {
			let obj = {};

			row.map((val, num) => obj[header[num]] = val);

			return obj;
		};

		return this.dockerOut(await Cmd.get(commands.images), handlerLine);
	}

	static async getDockerInfo() {
		const containers = await this.allContainers();
		const images = await this.allImages();

		return {
			containers,
			images
		};
	}

	static async getOneImageByRepositoryTag({repository, tag}) {
		const handlerLine = (row, header) => {
			let obj = {};

			row.map((val, num) => obj[header[num]] = val);

			return obj;
		};

		return this.dockerOut(await Cmd.get(commands.imageByRepositoryTag({repository, tag})), handlerLine).pop();
	}

	static async getOneContainer(id) {
		const handlerLine = (row, header) => {
			let obj = {};

			row.map((val, num) => obj[header[num]] = val);

			if (!obj.NAMES) {
				obj.NAMES = obj.PORTS;
				obj.PORTS = '';
			}

			return obj;
		};

		return await this.dockerOut(await Cmd.get(commands.getOneContainer(id)), handlerLine).pop();
	}
}

module.exports = ConsoleParser;
