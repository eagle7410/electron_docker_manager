const initialState = {
	selectIndex : 0,
};
const PREFIX = 'TABS';

const tabs = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}_CHANGE_SELECT`:
			return {
				...state,
				selectIndex : action.data
			};
	}

	return state;
};

export {tabs};
