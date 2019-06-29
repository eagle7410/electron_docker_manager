import {PREFIX_COMMENT, PREFIX_CONTAINER, PREFIX_IMAGES} from '../const/prefix'
const initialState = {
	data : [],
	selected  : [],
	wait : '',
	isRefresh : false,
};

const images = (state = initialState, action) => {
	let newState;

	// eslint-disable-next-line
	switch (action.type) {

		case `${PREFIX_IMAGES}_SELECTED`:
			return {
				...state,
				selected : action.data,
			};
		case `${PREFIX_IMAGES}_REFRESH_RUN`:
			return {
				...state,
				isRefresh : true,
			};

		case `${PREFIX_IMAGES}_REFRESH_STOP`:
			return {
				...state,
				selected  : [],
				isRefresh : false,
			};
		case `${PREFIX_COMMENT}_SAVE`:
			newState = {...state};

			if (action.data.type === 'images') {
				newState.data = newState.data.map(row => {
					if (row['IMAGE ID'] === action.data.id) row.COMMENT = action.data.comment;
					return row;
				})
			}

			return newState;

		case `${PREFIX_IMAGES}_CHANGE_LABEL_PORTS`:
			return {
				...state,
				data : state.data.map(row => {
					if (row['IMAGE ID'] === action.data.id) row.LABEL_PORTS = action.data.labelPorts;
					return row;
				})
			};
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
