import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {dataLoader} from './DataLoader'
import {containers} from './Containers'
import {images} from './Images'

const reducer = combineReducers({
	routing: routerReducer,
	dataLoader,
	containers,
	images
});

export {reducer};
