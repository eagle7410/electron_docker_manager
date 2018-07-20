import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {dataLoader} from './DataLoader'
import {control} from './Control'

const reducer = combineReducers({
	routing: routerReducer,
	dataLoader,
	control,
});

export {reducer};
