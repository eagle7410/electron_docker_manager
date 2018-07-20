import {reqFull, get} from '../utils/Req'

const init = () => reqFull(get, '/init');
const toggleContainer = (id, isRun) => reqFull(get, '/container-toggle-run', {isRun, id});
const renameContainer = (id, newname) => reqFull(get, '/container-rename', {newname, id});

export {
	init,
	toggleContainer,
	renameContainer,
};
