const initialState = {
	isLoad          : true,
	err  :  '',
	logs : [],
};

const dataLoader = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
        case 'MOVE_ERROR' :
            return {
                ...state,
                err : '',
	            logs : [],
            };

		case 'ADD_LOG' :
			return {
				...state,
				logs : state.logs.concat(action.data.mess)
			};

		case 'SET_ERROR' :
			return {
				...state,
				err : action.data
			};
	}

	return state;
};

export {dataLoader};
