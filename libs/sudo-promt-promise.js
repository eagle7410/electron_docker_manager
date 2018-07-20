const os = require('os');

class SudoExecCmd {
	constructor () {
		this._sudo = require(os.platform() === 'linux' ? 'sudo-js' : './cmd');
		this._pass = null;
	}

	setPassword (password) {
		if (!password) {
			throw new Error('Bad password');
		}

		this._pass = password;
		this._sudo.setPassword(this._pass);

		return this;
	}

	exec (arCmd) {
		return new Promise((ok,bad)=> {
			this._sudo.exec(arCmd, (err, pid, result) => {
				if (err) return bad(err);
				ok({pid, result});
			})
		});
	}
}

module.exports = SudoExecCmd;
