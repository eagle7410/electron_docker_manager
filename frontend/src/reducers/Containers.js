import {
	PREFIX_CONTAINER,
	PREFIX_COMMENT
} from '../const/prefix'
const initialState = {
	data : [],
	wait : ''
};

const containers = (state = initialState, action) => {
	let data;
	let newState;

	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_COMMENT}_SAVE`:
			newState = {...state};

			if (action.data.type !== 'containers')
				return state;

			newState.data = newState.data.map(row => {
				if (row['CONTAINER ID'] === action.data.id) row.COMMENT = action.data.comment;
				return row;
			});

			return newState;

		case `${PREFIX_CONTAINER}_CHANGE_LABEL_PORTS`:
			return {
				...state,
				data : state.data.map(row => {
					if (row['CONTAINER ID'] === action.data.id) row.LABEL_PORTS = action.data.labelPorts;
					return row;
				})
			};

		case `${PREFIX_CONTAINER}_WAIT_CHANGE_STATUS`:
			return {
				...state,
				wait : action.data
			};

		case `${PREFIX_CONTAINER}_ADD`:
			return {
				...state,
				data : state.data.concat([action.data]),
			};

		case `${PREFIX_CONTAINER}_DELETE`:
			const id = action.data;
			data = state.data.filter(row => row['CONTAINER ID'] !== id);

			return {
				...state,
				data,
				wait : ''
			};

		case `${PREFIX_CONTAINER}_CHANGE`:
			const container = action.data.container;
			data = state.data.map(row => row['CONTAINER ID'] === container['CONTAINER ID'] ? Object.assign({}, row, container) : row);

			return {
				...state,
				data,
				wait : ''
			};

		case `${PREFIX_CONTAINER}_INIT`:
			return {
				...state,
				data : action.data
			};
	}

	return state;
};

export {containers};
