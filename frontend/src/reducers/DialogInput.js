const noop = () => {};

const initialState = {
	label      : 'Not set',
	callSubmit : noop,
	isOpen     : false,
	input      : '',

};

const INPUT_DIALOG_PREFIX = 'INPUT_DIALOG';

const dialogInput = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${INPUT_DIALOG_PREFIX}_OPEN`:
			return {
				...state,
				...action.data,
				isOpen     : true,
			};

		case `${INPUT_DIALOG_PREFIX}_INPUT`:
			return {
				...state,
				input: action.data.input,
			};

		case `${INPUT_DIALOG_PREFIX}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogInput};
