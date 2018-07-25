import {PREFIX_INPUT_DIALOG} from '../const/prefix'
const noop = () => {};

const initialState = {
	label      : 'Not set',
	callSubmit : noop,
	isOpen     : false,
	input      : '',

};

const dialogInput = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_INPUT_DIALOG}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen     : true,
			};

		case `${PREFIX_INPUT_DIALOG}_INPUT`:
			return {
				...state,
				input: action.data.input,
			};

		case `${PREFIX_INPUT_DIALOG}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogInput};
