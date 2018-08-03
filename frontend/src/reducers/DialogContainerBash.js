import {PREFIX_CONTAINER_BASH} from '../const/prefix'
const initialState = {
	containerId : null,
	dockerCmd   : '',
	isOpen      : false,
	isLoad      : false,
	command     : '',
	out         : '',
	errors      : {}
};

const dialogContainerBash = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_CONTAINER_BASH}_ADD_OUT`:
			let out = action.data.out;

			if (out)
				out = (out + '\n' + state.out).replace(/\n/g, String.fromCharCode(13));
			else {
				out = state.out;
			}

			return {
				...state,
				out,
			};
		case `${PREFIX_CONTAINER_BASH}_EXEC`:
			return {
				...state,
				out : '[RUN] is:' + state.command + String.fromCharCode(13) + state.out,
				command : ''
			};

		case `${PREFIX_CONTAINER_BASH}_LOAD`:
			return {
				...state,
				isLoad : true,
			};

		case `${PREFIX_CONTAINER_BASH}_LOAD_STOP`:
			return {
				...state,
				isLoad : false,
			};

		case `${PREFIX_CONTAINER_BASH}_ERRORS`:
			return {
				...state,
				errors : action.data,
				isOpen : true,
			};
		case `${PREFIX_CONTAINER_BASH}_OPEN`:
			return {
				...state,
				containerId : action.data.id,
				dockerCmd   : `docker exec -it ${action.data.id} bash`,
				out         : '',
				isOpen      : true,
			};

		case `${PREFIX_CONTAINER_BASH}_INPUT`:
			return {
				...state,
				[action.data.field] : action.data.value
			};

		case `${PREFIX_CONTAINER_BASH}_CLOSE`:
			return {
				...initialState
			};
	}

	return state;
};

export {dialogContainerBash};
