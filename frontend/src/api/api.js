import {reqFull, save} from '../utils/Req'

const init = () => reqFull(save, '/init');
const toggleContainer = (id, isRun) => reqFull(save, '/container-toggle-run', {isRun, id});
const renameContainer = (id, newname) => reqFull(save, '/container-rename', {newname, id});
const deleteContainer = (id) => reqFull(save, '/container-delete', {id});
const createContainer = data => reqFull(save, '/container', data);
const saveFilePath    = () => reqFull(save, '/path-save');
const openFilePath    = () => reqFull(save, '/path-open');
const exportContainer = data => reqFull(save, '/container-export', data);
const importContainer = data => reqFull(save, '/container-import', data);

export {
	init,
	importContainer,
	toggleContainer,
	renameContainer,
	deleteContainer,
	createContainer,
	exportContainer,
	saveFilePath,
	openFilePath
};
