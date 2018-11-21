import {
	PREFIX_SETTINGS as PREFIX
} from '../const/prefix'

const initialState = {
	action : '',

};

const settings = (state = initialState, {type, data}) => {
	// eslint-disable-next-line
	switch (type) {
		case `${PREFIX}_RUN_DOIT`:
			return {
				...state,
				action : data
			};
		case `${PREFIX}_STOP_DOIT`:
			return {
				...state,
				action : ''
			};
	}

	return state;
};

export {settings};
