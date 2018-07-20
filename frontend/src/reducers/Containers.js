const initialState = {
	data : [],
	wait : ''
};

const containers = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'CONTAINER_WAIT_CHANGE_STATUS':
			return {
				...state,
				wait : action.data
			};

		case 'CONTAINER_CHANGE':
			const container = action.data.container;

			let data = state.data.map(row => row['CONTAINER ID'] === container['CONTAINER ID'] ? container : row);

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
