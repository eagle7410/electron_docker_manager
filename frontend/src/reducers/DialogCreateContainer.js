import {PREFIX_CREATE_CONTAINER_DIALOG} from '../const/prefix'
const initialState = {
	isOpen        : false,
	name          : '',
	portInner     : '',
	portExternal  : '',
	attach        : '',
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
			return {
				...state,
				[action.data.field] : action.data.value
			};

		case `${PREFIX_CREATE_CONTAINER_DIALOG}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogCreateContainer};
