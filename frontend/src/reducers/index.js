import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {dataLoader} from './DataLoader'
import {containers} from './Containers'
import {images} from './Images'
import {dialogInput} from './DialogInput'
import {dialogConfirm} from './DialogConfirm'
import {dialogCreateContainer} from './DialogCreateContainer'


const reducer = combineReducers({
	routing: routerReducer,
	dialogInput,
	dialogConfirm,
	dialogCreateContainer,
	dataLoader,
	containers,
	images
});

export {reducer};