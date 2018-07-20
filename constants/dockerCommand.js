
let commands = {
	version : 'docker --version',
	info    : 'docker info',
	containersActive:  'docker ps',
	containersAll:  'docker ps --all',
	images : 'docker images',
	toggleRun : ({id, isRun}) => `docker ${isRun ? 'stop' : 'start'} ${id}`,
	getOneContainer : id => `docker ps -af id="${id}"`
};


module.exports = commands;

