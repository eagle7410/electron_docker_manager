import React from 'react';
import {connect} from "react-redux";
import {PREFIX_IMAGES, PREFIX_IMAGE_PULL_DIALOG} from '../../../const/prefix';
import RaisedButton from 'material-ui/RaisedButton';
import IconPull from 'material-ui/svg-icons/file/cloud-download';
import DialogPullImage from './DialogPullImage';
import {imageDelete, images} from "../../../api/api";
import IconRefresh from "material-ui/svg-icons/navigation/refresh";

const ToolsBar = (state) => {
	let cls = '';

	if (state.store.isRefresh) cls = 'wait-update-status';

	const handlerRefresh = async () => {
		state.refreshRun();

		try {
			const data = await images();
			state.setImages(data.images);
		} catch (e) {
			alert(typeof e === 'string' ? e : e.stack)
		} finally {
			state.refreshStop();
		}
	};

	const handleDelete = async () => {
		try {
			state.refreshRun();
			state.wait('delAllSelect');
			const ids = state.store.selected.map(inx => state.store.data[inx]['IMAGE ID']);
			await imageDelete({id :ids.join(' ')});
			await handlerRefresh();
		} catch (e) {
			alert(typeof e === 'string' ? e : e.stack)
		} finally {
			state.waitStop();
			state.refreshStop()
		}
	};

	const len = state.store.selected.length;

	return (
		<span>
			<RaisedButton
				className={cls}
				label="Refresh image"
				primary={true}
				icon={<IconRefresh/>}
				onClick={() => handlerRefresh()}
			/>
			<RaisedButton
				label="Pull image"
				primary={true}
				icon={<IconPull/>}
				onClick={state.dialogPullOpen}
			/>
			<RaisedButton
				key={'imgSelDelete'}
				label={`delete selected (${len} of ${state.store.data.length})`}
				disabled={!len}
				secondary
				onClick={() => handleDelete()}
			/>
			<DialogPullImage />
		</span>
	);
};

export default connect(
	state => ({
		store : state.images
	}),
	dispatch => ({
		dialogPullOpen  : ()     => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_OPEN`}),
		refreshRun      : ()     => dispatch({type: `${PREFIX_IMAGES}_REFRESH_RUN`}),
		refreshStop     : ()     => dispatch({type: `${PREFIX_IMAGES}_REFRESH_STOP`}),
		wait            : (data) => dispatch({type: `${PREFIX_IMAGES}_WAIT`, data}),
		waitStop        : ()     => dispatch({type: `${PREFIX_IMAGES}_WAIT_STOP`}),
		setImages       : (data) => dispatch({type: `${PREFIX_IMAGES}_INIT`, data}),
	})
)(ToolsBar);
