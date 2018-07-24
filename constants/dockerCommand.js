
let commands = {
	version              : 'docker --version',
	info                 : 'docker info',
	containersActive     : 'docker ps',
	containersAll        : 'docker ps --all',
	images               : 'docker images',
	imageByRepositoryTag : ({repository, tag}) => `docker images ${repository}:${tag}`,
	toggleRun            : ({id, isRun}) => `docker ${isRun ? 'stop' : 'start'} ${id}`,
	getOneContainer      : id => `docker ps -af id="${id}"`,
	stop                 : ({id}) => `docker stop ${id}`,
	containerRename      : ({id , newname}) => `docker container rename ${id} ${newname}`,
	containerDelete      : ({id}) => `docker rm ${id}`,
	containerCreate      : ({name, image, portInner, portExternal, attach}) => `docker run -d --with-volumes=true --name ${name} -p ${portExternal}:${portInner} ${attach} ${image}`,
	containerToImage     : ({id, message, author, repository, tag, attach}) => {
		attach = attach || '';

		let _message = '';
		let _author  = '';

		if (_message.length) _message = `-m "${_message}"`;
		if (_author.length) _author = `-a "${_author}"`;

		return `docker commit ${_author} ${_message} ${attach} --with-volumes=true ${id}  ${repository}:${tag}`;
	},
	imageSave            : ({id, path}) => `docker save -o "${path}" ${id}`
};


module.exports = commands;

