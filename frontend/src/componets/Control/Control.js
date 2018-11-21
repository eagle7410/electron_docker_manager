import React from 'react';
import {connect} from "react-redux";
import Paper from 'material-ui/Paper'
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import IconImages from 'material-ui/svg-icons/image/adjust';
import IconSettings from 'material-ui/svg-icons/action/settings';
import {Tabs, Tab} from 'material-ui/Tabs';
import Contains from './Contains/Contains';
import Images from './Images/Images';
import Settings from './Settings/Settings';
import DialogInput from '../tools/DialogInput'
import DialogConfirm from '../tools/DialogConfirm'
import DialogComment from './DialogComment'
import {PREFIX_TABS} from '../../const/prefix'

const Control = (state) => {

	return (
		<div key={'Control'}>
			<Paper zDepth={2}>
				<Tabs value={state.store.selectIndex} onChange={state.changeTab} key={'tabs'}>
					<Tab value={0} icon={<IconContainers/>} label="Containers" style={{height: '100px'}} key={'t0'}>
						<Contains/>
					</Tab>
					<Tab value={1} icon={<IconImages/>} label="Images" key={'t1'}>
						<Images/>
					</Tab>
					<Tab value={2} icon={<IconSettings/>} label="Settings" key={'t2'}>
						<Settings />
					</Tab>
				</Tabs>
			</Paper>
			<DialogComment/>
			<DialogInput />
			<DialogConfirm />
		</div>
	);
};

export default connect(
	state => ({
		store: state.tabs
	}),
	dispatch => ({
		changeTab : data => dispatch({type : `${PREFIX_TABS}_CHANGE_SELECT`, data})
	})
)(Control);
