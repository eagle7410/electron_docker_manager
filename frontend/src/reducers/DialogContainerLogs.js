import {PREFIX_CONTAINER_LOGS_DIALOG} from '../const/prefix'
const initialState = {
	containerId : null,
	isOpen      : false,
	isLoad      : false,
	countLines  : 200,
	text        : '',
	errors      : {}
};

const dialogContainerLogs = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_CONTAINER_LOGS_DIALOG}_ADD`:
			return {
				...state,
				text : action.data.text || ''
			};

		case `${PREFIX_CONTAINER_LOGS_DIALOG}_LOAD`:
			return {
				...state,
				isLoad : true,
			};

		case `${PREFIX_CONTAINER_LOGS_DIALOG}_LOAD_STOP`:
			return {
				...state,
				isLoad : false,
			};

		case `${PREFIX_CONTAINER_LOGS_DIALOG}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${PREFIX_CONTAINER_LOGS_DIALOG}_OPEN`:
			return {
				...state,
				containerId : action.data.id,
				isOpen      : true,
			};

		case `${PREFIX_CONTAINER_LOGS_DIALOG}_INPUT`:
			let newState = {
				...state,
				[action.data.field] : action.data.value
			};

			if (action.data.field === 'countLines' ) {
				if (isNaN(action.data.value)) return {...state};
				if (action.data.value > 1600) return {...state, countLines: 1600};
			}

			return newState;

		case `${PREFIX_CONTAINER_LOGS_DIALOG}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogContainerLogs};
