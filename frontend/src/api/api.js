import {save, reqFull, get} from '../utils/Req'

const init = () => reqFull(get, '/init');
const toggleService = service => reqFull(save, '/status', {service});

export {
	init,
	toggleService,
};
