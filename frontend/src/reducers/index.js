import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {dataLoader} from './DataLoader'
import {containers} from './Containers'
import {images} from './Images'
import {dialogInput} from './DialogInput'
import {dialogConfirm} from './DialogConfirm'
import {dialogCreateContainer} from './DialogCreateContainer'
import {dialogContainerToImage} from './DialogContainerToImage'
import {dialogPullImage} from './DialogPullImage'
import {tabs} from './Tabs'

const reducer = combineReducers({
	routing: routerReducer,
	dialogContainerToImage,
	dialogInput,
	dialogConfirm,
	dialogCreateContainer,
	dialogPullImage,
	dataLoader,
	containers,
	tabs,
	images
});

export {reducer};
