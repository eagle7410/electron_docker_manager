const initialState = {
	err  : '',
	pass : ''
};

const pass = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'PASS_ERROR':
			return {
				...state,
				err : action.err
			};

		case 'PASS_SET':
			return {
				...state,
				pass : action.pass
			};
	}

	return state;
};

export {pass};
