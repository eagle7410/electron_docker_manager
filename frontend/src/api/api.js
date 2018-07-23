import {reqFull, save} from '../utils/Req'

const init = () => reqFull(save, '/init');
const toggleContainer = (id, isRun) => reqFull(save, '/container-toggle-run', {isRun, id});
const renameContainer = (id, newname) => reqFull(save, '/container-rename', {newname, id});
const deleteContainer = (id) => reqFull(save, '/container-delete', {id});

export {
	init,
	toggleContainer,
	renameContainer,
	deleteContainer
};
