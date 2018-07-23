const initialState = {
	data : [],
	wait : ''
};

const containers = (state = initialState, action) => {
	let data;

	// eslint-disable-next-line
	switch (action.type) {
		case 'CONTAINER_WAIT_CHANGE_STATUS':
			return {
				...state,
				wait : action.data
			};

		case 'CONTAINER_DELETE':
			const id = action.data;
			data = state.data.filter(row => row['CONTAINER ID'] !== id);

			return {
				...state,
				data,
				wait : ''
			};

		case 'CONTAINER_CHANGE':
			const container = action.data.container;
			data = state.data.map(row => row['CONTAINER ID'] === container['CONTAINER ID'] ? container : row);

			return {
				...state,
				data,
				wait : ''
			};

		case 'CONTAINERS_INIT':
			return {
				...state,
				data : action.data
			};
	}

	return state;
};

export {containers};
