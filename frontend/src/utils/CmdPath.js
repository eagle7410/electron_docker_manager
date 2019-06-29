import {join} from 'path'

class CmdPath {
	static getPath(placeCurrent, cmd) {

		if (!cmd.includes('cd ')) return null;

		// eslint-disable-next-line
		let arCmd = cmd.split(/(\&\&|\|\|)/);

		let newPlace = [placeCurrent], path;

		for (let c of arCmd) {
			c  = c.trim();

			if (c.substring(0,2) !== 'cd') continue;

			path = c.split(' ')[1];

			if (!['.', '/'].includes(path[0])) path = './' + path;

			if (path[0] === '.') newPlace.push(path);
			else newPlace = [path];
		}

		return join(...newPlace);
	}
}

export default CmdPath;
