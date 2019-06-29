
import assert from 'assert'
import CmdPath from '../utils/CmdPath'

describe('Test util CmdPath', function () {
	it('test getPath', () => {

		let result = CmdPath.getPath('/', 'ls -la');
		assert.ok(result === null);

		result = CmdPath.getPath('/', 'ls -la && ls -la  || cd /bin');
		assert.equal(result, '/bin');
		result = CmdPath.getPath(result, 'ls -la && ls -la  || cd /home');
		assert.equal(result, '/home');

		result = CmdPath.getPath(result, 'cd /bin/run && cd ../test');
		assert.equal(result, '/bin/test');

		result = CmdPath.getPath(result, 'cd ./run && ls -la && cd /home/igor/best || cd ..');
		assert.equal(result, '/home/igor');
	});
});
