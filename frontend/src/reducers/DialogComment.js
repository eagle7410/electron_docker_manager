import {PREFIX_COMMENT} from '../const/prefix'
const noop = () => {};

const initialState = {
	comment : '',
	type    : null,
	id      :  null,
	isOpen  : false,
	errors  : {}
};

const dialogComment = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_COMMENT}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen: true
			};

		case `${PREFIX_COMMENT}_ERRORS`:
			return {
				...state,
				errors: action.data
			};

		case `${PREFIX_COMMENT}_CLOSE`:
			return {...initialState};

		case `${PREFIX_COMMENT}_INPUT`:
			return {
				...state,
				comment: action.data
			};

	}

	return state;
};

export {dialogComment};
