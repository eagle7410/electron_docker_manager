import React from 'react';
import {connect} from "react-redux";
import {containers} from "../../../api/api";

import RaisedButton from 'material-ui/RaisedButton';
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import IconRefresh from 'material-ui/svg-icons/navigation/refresh';
import DialogCreateContainer from './DialogCreateContainer';
import {
	PREFIX_CREATE_CONTAINER_DIALOG,
	PREFIX_CONTAINER
} from '../../../const/prefix'

const ToolsBar = (state) => {
	let cls = '';

	if (state.store.isRefresh) cls = 'wait-update-status';

	const handlerRefresh = async () => {
		state.refreshRun();

		try {

			const data = await containers();

			state.setContainers(data);

		} catch (e) {
			alert(typeof e === 'string' ? e : e.stack)
		} finally {
			state.refreshStop();
		}
	};
	return (
		<span>
			<RaisedButton
				className={cls}
				label="Refresh"
				primary={true}
				icon={<IconRefresh/>}
				onClick={() => handlerRefresh()}
			/>
			<RaisedButton
				label="Create container"
				primary={true}
				icon={<IconContainers/>}
				onClick={() => state.createOpen()}
			/>
			<DialogCreateContainer/>
		</span>
	);
};

export default connect(
	state => ({
		store : state.containers
	}),
	dispatch => ({
		setContainers : ({containers}) => dispatch({type: `${PREFIX_CONTAINER}_INIT`, data: containers}),
		refreshRun    : () => dispatch({type: `${PREFIX_CONTAINER}_REFRESH_RUN`}),
		refreshStop   : () => dispatch({type: `${PREFIX_CONTAINER}_REFRESH_STOP`}),
		createOpen    : () => dispatch({type: `${PREFIX_CREATE_CONTAINER_DIALOG}_OPEN`}),
	})
)(ToolsBar);
