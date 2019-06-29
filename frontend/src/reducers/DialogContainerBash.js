import {PREFIX_CONTAINER_BASH} from '../const/prefix'
import CmdPath from '../utils/CmdPath'

const initialState = {
	containerId : null,
	dockerCmd   : '',
	isOpen      : false,
	isLoad      : false,
	preCmd      : '',
	command     : '',
	place       : '/',
	out         : '',
	errors      : {}
};

const dialogContainerBash = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX_CONTAINER_BASH}_ADD_OUT`:
			let out = action.data.out;

			let place = String(state.place);

			if (!out.includes('can\'t cd'))
				place = CmdPath.getPath(place, state.preCmd);

			// TODO: clear
			console.log('place', place, state.place, state.preCmd);
			place = place || state.place;

			if (out)
				out = (out + '\n' + place + ' $ ' + state.preCmd + '\n' + state.out).replace(/\n/g, String.fromCharCode(13));
			else
				out = state.out + '\n' + place + ' $ ' + state.preCmd;

			return {
				...state,
				preCmd : '',
				place,
				out,
			};

		case `${PREFIX_CONTAINER_BASH}_EXEC`:

			return {
				...state,
				preCmd  : String(state.command),
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
