import React from 'react';
import {connect} from "react-redux";

import RaisedButton from 'material-ui/RaisedButton';
import IconExport from 'material-ui/svg-icons/action/get-app';
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import DialogCreateContainer from './DialogCreateContainer';

const CREATE_CONTAINER_DIALOG_PREFIX = 'CREATE_CONTAINER_DIALOG';

const Actions = (state) => {
	const handelTry = async (call, finish) => {
		try {
			await call();
		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			if (finish) finish();
		}
	};

	return (
		<span>
			<RaisedButton
				label="Create container"
				primary={true}
				icon={<IconContainers/>}
				onClick={() => state.createOpen()}
			/>
			<RaisedButton
				label="Download container"
				primary={true}
				icon={<IconExport/>}
			/>
			<DialogCreateContainer/>
	</span>

	);
};

export default connect(
	state => ({
		dialog: state.dialogInput,
	}),
	dispatch => ({
		createOpen  : () => dispatch({type: `${CREATE_CONTAINER_DIALOG_PREFIX}_OPEN`}),
	})
)(Actions);
