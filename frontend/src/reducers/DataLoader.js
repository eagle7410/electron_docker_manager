const initialState = {
	isLoad          : true,
	dockerLoadCount : 1,
	labelDockerLoad : 'Docker load',
	labelDockerLoadPoints : '.',
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


		case 'DOCKER_LOAD_NEXT_POINT':
			let count = state.dockerLoadCount;
			let points;

			if (count === 4) count = 1;

            // eslint-disable-next-line
			switch (count) {
				case 1: points =  '.'; break;
				case 2: points =  '..'; break;
				case 3: points =  '...'; break;
			}

			count++;

			return {
				...state,
				dockerLoadCount : count,
				labelDockerLoadPoints : points,
			}
	}

	return state;
};

export {dataLoader};
