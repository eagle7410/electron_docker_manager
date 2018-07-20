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
	}

	return state;
};

export {images};
