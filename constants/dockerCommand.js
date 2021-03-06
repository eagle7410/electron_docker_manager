
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
	containerCreate      : ({name, image, portInner, portExternal, attach, volumesFrom, attachToEnd}) => {
		name = name.replace(/\s/g, '_');
		const _volumesFrom = volumesFrom.length ? `--volumes-from ${volumesFrom}` : '';

		return `docker run -d --name "${name}" -p ${portExternal}:${portInner} ${_volumesFrom} ${attach} ${image} ${attachToEnd}`
	},
	containerToImage     : ({id, message, author, repository, tag, attach, }) => {
		const _message = message.length ? `-m "${message}"` :'';
		const _author  = author.length  ? `-a "${author}"`  :'';

		const options = `${_author} ${_message} ${attach || ''}`;

		return `docker commit ${options.trim()} ${id}  ${repository}:${tag}`;
	},
	imageSave            : ({id, path}) => `docker save -o "${path}" ${id}`,
	imageDelete          : ({id})       => `docker rmi ${id}`,
	imagePull            : ({repository, tag}) => `docker pull ${repository}:${tag}`,
	containerLogLines    : ({containerId, countLines}) => `docker logs ${containerId} --tail ${countLines}`,
	containerBashOpen    : ({id}) => `docker exec -i ${id} sh`,
	containerStats       : ({id}) => `docker stats ${id || ''} --no-stream`,
	containerLimit       : ({id, cpus, memory}) => {
		const partCpus = cpus ? `--cpus=${cpus}` : '';
		const partMemory = memory ? `-m=${memory}M` : '';

		return `docker update ${partCpus} ${partMemory} ${id}`;
	}
};

module.exports = commands;

