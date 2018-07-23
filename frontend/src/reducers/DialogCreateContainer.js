
const initialState = {
	isOpen        : false,
	name          : '',
	portInner     : '',
	portExternal  : '',
	attach        : '',
	image         : '',
	errors        : {},
};

const CREATE_CONTAINER_DIALOG_PREFIX = 'CREATE_CONTAINER_DIALOG';

const dialogCreateContainer = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${CREATE_CONTAINER_DIALOG_PREFIX}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${CREATE_CONTAINER_DIALOG_PREFIX}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen     : true,
			};

		case `${CREATE_CONTAINER_DIALOG_PREFIX}_INPUT`:
			return {
				...state,
				[action.data.field] : action.data.value
			};

		case `${CREATE_CONTAINER_DIALOG_PREFIX}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogCreateContainer};
