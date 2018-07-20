const initialState = {
	mongo         : false,
	mysql         : false,
	myadmin       : false,
	redis         : false,
	redis_manager : false,
	postgres      : false,
	postgis       : false,
	pgadmin       : false,
	wait    : false,
	ports   : {
		mongo         : 27017,
		mysql         : 3306,
		myadmin       : 8080,
		redis         : 6379,
		redis_manager : 9000,
		postgres      : 5433,
		postgis       : 5434,
		pgadmin       : 5051,
	}
};

const control = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'SET_STATUSES':
			return {
				...state,
				...action.statuses
			};
		case 'WAIT' :
			return {
				...state,
				wait: action.service
			};

		case 'STATUS_CHANGE':
			let stateNew = {
				...state,
				wait: false
			};

			stateNew[action.service] = action.status;

			return stateNew;

	}

	return state;
};

export {control};
