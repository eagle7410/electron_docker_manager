import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {dataLoader} from './DataLoader'
import {containers} from './Containers'
import {images} from './Images'
import {dialogInput} from './DialogInput'


const reducer = combineReducers({
	routing: routerReducer,
	dialogInput,
	dataLoader,
	containers,
	images
});

export {reducer};
