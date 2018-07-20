
let commands = {
	version : 'docker --version',
	info    : 'docker info',
	containersActive:  'docker ps',
	containersAll:  'docker ps --all',
	images : 'docker images',
	toggleRun : ({id, isRun}) => `docker ${isRun ? 'stop' : 'start'} ${id}`,
	getOneContainer : id => `docker ps -af id="${id}"`,
	stop : ({id}) => `docker stop ${id}`,
};


module.exports = commands;

