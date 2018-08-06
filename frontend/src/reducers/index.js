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
import {dialogContainerLogs} from './DialogContainerLogs'
import {dialogContainerBash} from './DialogContainerBash'
import {dialogComment} from './DialogComment'

import {tabs} from './Tabs'

const reducer = combineReducers({
	routing: routerReducer,
	dialogComment,
	dialogContainerBash,
	dialogContainerLogs,
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
