const initialState = {
	data: [],
};

const images = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'IMAGES_INIT':
			return {
				...state,
				data : action.data
			};
		case 'IMAGES_ADD':
			return {
				...state,
				data : state.data.concat([action.data])
			};
	}

	return state;
};

export {images};
