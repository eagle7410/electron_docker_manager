const noop = () => {};

const initialState = {
	question    : 'Not question',
	callConfirm : noop,
	isOpen      : false,
	input       : '',

};

const CONFIRM_DIALOG_PREFIX = 'CONFIRM_DIALOG';

const dialogConfirm = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${CONFIRM_DIALOG_PREFIX}_OPEN`:
			return {
				...state,
				question    : action.data.question,
				callConfirm : action.data.callConfirm,
				isOpen      : true,
			};

		case `${CONFIRM_DIALOG_PREFIX}_CLOSE`:
			return {...initialState};
	}

	return state;
};

export {dialogConfirm};
