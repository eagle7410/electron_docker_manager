import React from 'react';
import {connect} from "react-redux";
import {containers, deleteContainer, toggleContainer} from "../../../api/api";

import RaisedButton from 'material-ui/RaisedButton';
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import IconRefresh from 'material-ui/svg-icons/navigation/refresh';
import DialogCreateContainer from './DialogCreateContainer';
import {
	PREFIX_CREATE_CONTAINER_DIALOG,
	PREFIX_CONTAINER, PREFIX_CONFIRM_DIALOG
} from '../../../const/prefix'

const ToolsBar = (state) => {
	let cls = '';

	if (state.store.isRefresh) cls = 'wait-update-status';

	const handelTry = async (call, finish) => {
		try {
			await call();
		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			if (finish) finish();
		}
	};

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

	const startWaitRefresh = () => {
		state.wait();
		state.refreshRun();
	};

	const stopWaitRefresh = async () => {
		await handlerRefresh()
		state.waitStop();
	};

	const handleStart = () => handelTry(async () => {
		startWaitRefresh();
		const ids = state.store.selected.map(inx => state.store.data[inx]["CONTAINER ID"]);
		await toggleContainer(ids.join(' '), false);
	}, stopWaitRefresh);

	const handleStop = () => handelTry(async () => {
		startWaitRefresh();
		const ids = state.store.selected.map(inx => state.store.data[inx]["CONTAINER ID"]);
		await toggleContainer(ids.join(' '), true);
	}, stopWaitRefresh);

	const handleDelete = () => handelTry(async () => {
		startWaitRefresh();
		const ids = state.store.selected.map(inx => state.store.data[inx]["CONTAINER ID"]);
		await deleteContainer(ids.join(' '));
	}, stopWaitRefresh);

	const len = state.store.selected.length;

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
			<RaisedButton
				key={'contSelDelete'}
				label={`delete selected (${len} of ${state.store.data.length})`}
				disabled={!len}
				secondary
				onClick={() => handleDelete()}
			/>
			<RaisedButton
				key={'contSelStop'}
				label="stop selected"
				primary
				disabled={!len}
				onClick={() => handleStop()}
			/>
			<RaisedButton
				key={'contSelStart'}
				label="start selected"
				primary
				disabled={!len}
				onClick={() => handleStart()}
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
		wait          : () => dispatch({type: `${PREFIX_CONTAINER}_WAIT_CHANGE_STATUS`, data: 'selected'}),
		waitStop      : () => dispatch({type: `${PREFIX_CONTAINER}_WAIT_CLEAR`}),
		setContainers : ({containers}) => dispatch({type: `${PREFIX_CONTAINER}_INIT`, data: containers}),
		refreshRun    : () => dispatch({type: `${PREFIX_CONTAINER}_REFRESH_RUN`}),
		refreshStop   : () => dispatch({type: `${PREFIX_CONTAINER}_REFRESH_STOP`}),
		createOpen    : () => dispatch({type: `${PREFIX_CREATE_CONTAINER_DIALOG}_OPEN`}),
		deleteClose   : () => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_CLOSE`}),
	})
)(ToolsBar);
