import {save, reqFull, get} from '../utils/Req'

const init = () => reqFull(get, '/init');
const savePass = (pass) => reqFull(save, '/pass', {pass});
const toggleService = service => reqFull(save, '/status', {service});
const isDockerLoad  = () => reqFull(get, '/docker-load');

export {
	init,
	savePass,
	toggleService,
	isDockerLoad,
};
