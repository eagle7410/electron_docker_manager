import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {dataLoader} from './DataLoader'
import {control} from './Control'
import {pass} from './PASS'

const reducer = combineReducers({
	routing: routerReducer,
	dataLoader,
	control,
	pass
});

export {reducer};
