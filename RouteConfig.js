const Send     = require('./libs/Send');
const Cmd      = require('./libs/Cmd');
const timeout  = require('./libs/timeout');
const commands = require('./constants/dockerCommand');

const route = (route, handler, method) => ({route, handler, method});

const config = [
	route('/init', async (res, action) => {
		try {
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

			// parse docker images, containers


			Send.ok(res, action, response);

		} catch (e) {

			console.error(e);

			Send.err(res, action, e.message ? e.message : e);
		}
	})
];

class RouteConfig {
	static get () {
		return config;
	}
}

module.exports = RouteConfig;
