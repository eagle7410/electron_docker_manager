import {PREFIX_CONTAINER_2_IMAGE} from '../const/prefix';

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

const dialogContainerToImage = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_CONTAINER_2_IMAGE}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${PREFIX_CONTAINER_2_IMAGE}_OPEN`:
			return {
				...state,
				...action.data,
				tag    : Date.now(),
				isOpen : true,
			};

		case `${PREFIX_CONTAINER_2_IMAGE}_INPUT`:
			return {
				...state,
				[action.data.field] : action.data.value
			};

		case `${PREFIX_CONTAINER_2_IMAGE}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogContainerToImage};
