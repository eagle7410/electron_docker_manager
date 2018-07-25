import {PREFIX_TABS} from '../const/prefix'
const initialState = {
	selectIndex : 0,
};

const tabs = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_TABS}_CHANGE_SELECT`:
			return {
				...state,
				selectIndex : action.data
			};
	}

	return state;
};

export {tabs};
