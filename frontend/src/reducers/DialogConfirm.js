import {PREFIX_CONFIRM_DIALOG} from '../const/prefix'
const noop = () => {};

const initialState = {
	question    : 'Not question',
	callConfirm : noop,
	isOpen      : false,
	input       : '',

};

const dialogConfirm = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_CONFIRM_DIALOG}_OPEN`:
			return {
				...state,
				question    : action.data.question,
				callConfirm : action.data.callConfirm,
				isOpen      : true,
			};

		case `${PREFIX_CONFIRM_DIALOG}_CLOSE`:
			return {...initialState};
	}

	return state;
};

export {dialogConfirm};
