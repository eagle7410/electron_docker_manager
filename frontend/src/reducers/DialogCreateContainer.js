import {PREFIX_CREATE_CONTAINER_DIALOG} from '../const/prefix'
const initialState = {
	isOpen        : false,
	name          : '',
	portInner     : '',
	portExternal  : '',
	attach        : '',
	attachToEnd   : '',
	image         : '',
	volumesFrom   : '',
	errors        : {},
};

const dialogCreateContainer = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_CREATE_CONTAINER_DIALOG}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${PREFIX_CREATE_CONTAINER_DIALOG}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen     : true,
			};

		case `${PREFIX_CREATE_CONTAINER_DIALOG}_INPUT`:
			let newState = {
				...state,
				[action.data.field] : action.data.value
			};

			if (action.data.field === 'image') {
				newState[action.data.field] = action.data.value.value;
				if (action.data.value.port) newState.portInner = action.data.value.port;
			}

			return newState;

		case `${PREFIX_CREATE_CONTAINER_DIALOG}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogCreateContainer};
