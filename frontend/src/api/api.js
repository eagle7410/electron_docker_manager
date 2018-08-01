import {reqFull, save} from '../utils/Req'

const init                    = ()            => reqFull(save, '/init');
const toggleContainer         = (id, isRun)   => reqFull(save, '/container-toggle-run', {isRun, id});
const renameContainer         = (id, newname) => reqFull(save, '/container-rename', {newname, id});
const deleteContainer         = (id)          => reqFull(save, '/container-delete', {id});
const createContainer         = data          => reqFull(save, '/container', data);
const saveFilePath            = ()            => reqFull(save, '/path-save');
const openFilePath            = ()            => reqFull(save, '/path-open');
const containerToImage        = (data)        => reqFull(save, '/container-commit', data);
const containerEditLabelPorts = (data)        => reqFull(save, '/container-edit-label-ports', data);
const imageSave               = (data)        => reqFull(save, '/image-save', data);
const imageDelete             = (data)        => reqFull(save, '/image-delete', data);
const imageEditLabelPorts     = (data)        => reqFull(save, '/image-edit-label-ports', data);
const imagePull               = (data)        => reqFull(save, '/image-pull', data);
const containerLogs           = (data)        => reqFull(save, '/container-logs', data);

export {
	init,
	containerLogs,
	containerEditLabelPorts,
	containerToImage,
	toggleContainer,
	renameContainer,
	deleteContainer,
	createContainer,
	saveFilePath,
	imageSave,
	imageDelete,
	imageEditLabelPorts,
	imagePull
};
