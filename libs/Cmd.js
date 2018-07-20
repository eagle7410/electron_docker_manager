const cmd = require('node-cmd');

class Cmd {
	/**
	 * Run command in shell and return shell out.
	 *
	 * @param {string} command
	 *
	 * @return {Promise<any>}
	 */
	static get(command) {
		return new Promise((ok,bad)=> {
			cmd.get(command, (err, data) => {
				if (err) return bad(err);
				ok(data);
			})
		});
	}

	/**
	 * Run command in shell.
	 *
	 * @param {string} command
	 */
	static run(command) {
		return cmd.run(command);
	}
}

module.exports = Cmd;
