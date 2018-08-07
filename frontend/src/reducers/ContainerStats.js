import {
	PREFIX_CONTAINER_STATS
} from '../const/prefix'

const initialState = {
	isOpen              : false,
	isLoad              : false,
	id                  : null,
	NAME                : '',
	'CPU %'             : 0,
	'MEM USAGE / LIMIT' : '',
	'MEM %'             : '',
	'NET I/O'           : '',
	'BLOCK I/O'         : '',
	PIDS                : ''
};

const containerStats = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {

		case `${PREFIX_CONTAINER_STATS}_LOAD`:
			return {
				...state,
				isLoad : true
			};

		case `${PREFIX_CONTAINER_STATS}_LOAD_STOP`:
			return {
				...state,
				isLoad : false
			};

		case `${PREFIX_CONTAINER_STATS}_UPDATE`:
			return {
				...state,
				...action.data
			};

		case `${PREFIX_CONTAINER_STATS}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen: true
			};

		case `${PREFIX_CONTAINER_STATS}_CLOSE`:
			return {...initialState};
	}

	return state;
};

export {containerStats};
