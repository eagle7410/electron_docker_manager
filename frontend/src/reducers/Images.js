import {PREFIX_IMAGES} from '../const/prefix'
const initialState = {
	data : [],
	wait : '',
};

const images = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_IMAGES}_DELETE`:
			return {
				...state,
				data : state.data.filter(image => image['IMAGE ID'] !== action.data)
			};
		case `${PREFIX_IMAGES}_WAIT_STOP`:
			return {
				...state,
				wait : ''
			};
		case `${PREFIX_IMAGES}_WAIT`:
			return {
				...state,
				wait : action.data
			};
		case `${PREFIX_IMAGES}_INIT`:
			return {
				...state,
				data : action.data
			};
		case `${PREFIX_IMAGES}_ADD`:
			return {
				...state,
				data : state.data.concat([action.data])
			};
	}

	return state;
};

export {images};
