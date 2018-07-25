import React from 'react';
import {connect} from "react-redux";
import Paper from 'material-ui/Paper'
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import IconImages from 'material-ui/svg-icons/image/adjust';
import {Tabs, Tab} from 'material-ui/Tabs';
import Contains from './Contains/Contains';
import Images from './Images/Images';
import DialogInput from '../tools/DialogInput'
import DialogConfirm from '../tools/DialogConfirm'
import {PREFIX_TABS} from '../../const/prefix'

const Control = (state) => {

	return (
		<div>
			<Paper zDepth={2}>
				<Tabs value={state.store.selectIndex} onChange={state.changeTab}>
					<Tab value={0} icon={<IconContainers/>} label="Containers" style={{height: '100px'}}>
						<Contains/>
					</Tab>
					<Tab value={1} icon={<IconImages/>} label="Images">
						<Images/>
					</Tab>
				</Tabs>
			</Paper>
			<DialogInput />
			<DialogConfirm />
		</div>
	);
};

;

export default connect(
	state => ({
		store: state.tabs
	}),
	dispatch => ({
		changeTab : data => dispatch({type : `${PREFIX_TABS}_CHANGE_SELECT`, data})
	})
)(Control);
