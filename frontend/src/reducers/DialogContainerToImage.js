
const initialState = {
	id         : null,
	isOpen     : false,
	repository : '',
	tag        : '',
	message    : '',
	author     : '',
	attach     : '',
	errors     : {},
};

const PREFIX = 'CREATE_IMAGE_FROM_CONTAINER_DIALOG';

const dialogContainerToImage = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${PREFIX}_OPEN`:
			return {
				...state,
				...action.data,
				tag    : Date.now(),
				isOpen : true,
			};

		case `${PREFIX}_INPUT`:
			return {
				...state,
				[action.data.field] : action.data.value
			};

		case `${PREFIX}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogContainerToImage};
