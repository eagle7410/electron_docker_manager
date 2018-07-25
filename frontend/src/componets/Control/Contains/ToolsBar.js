import React from 'react';
import {connect} from "react-redux";

import RaisedButton from 'material-ui/RaisedButton';
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import DialogCreateContainer from './DialogCreateContainer';
import {PREFIX_CREATE_CONTAINER_DIALOG} from '../../../const/prefix'

const ToolsBar = (state) => {
	return (
		<span>
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
		dialog: state.dialogInput,
	}),
	dispatch => ({
		createOpen  : () => dispatch({type: `${PREFIX_CREATE_CONTAINER_DIALOG}_OPEN`}),
	})
)(ToolsBar);
