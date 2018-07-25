import {PREFIX_IMAGE_PULL_DIALOG} from '../const/prefix'

const initialState = {
	isOpen        : false,
	isLoad        : false,
	repository    : '',
	tag           : 'latest',
	errors        : {},

};

const dialogPullImage = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_IMAGE_PULL_DIALOG}_LOAD`:
			return {
				...state,
				isLoad : true,
			};
		case `${PREFIX_IMAGE_PULL_DIALOG}_LOAD_STOP`:
			return {
				...state,
				isLoad : false,
			};
		case `${PREFIX_IMAGE_PULL_DIALOG}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${PREFIX_IMAGE_PULL_DIALOG}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen     : true,
			};

		case `${PREFIX_IMAGE_PULL_DIALOG}_INPUT`:
			return {
				...state,
				[action.data.field] : action.data.value
			};

		case `${PREFIX_IMAGE_PULL_DIALOG}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogPullImage};
