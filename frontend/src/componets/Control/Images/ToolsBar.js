import React from 'react';
import {connect} from "react-redux";
import {PREFIX_IMAGE_PULL_DIALOG} from '../../../const/prefix';
import RaisedButton from 'material-ui/RaisedButton';
import IconPull from 'material-ui/svg-icons/file/cloud-download';
import IconLoad from 'material-ui/svg-icons/action/get-app';

const ToolsBar = (state) => {
	return (
		<span>
			<RaisedButton
				label="Pull image"
				primary={true}
				icon={<IconPull/>}
				onClick={() => alert('not implement')}
			/>
			<RaisedButton
				label="Image load"
				primary={true}
				icon={<IconLoad/>}
				onClick={() => alert('not implement')}
			/>
		</span>
	);
};

export default connect(
	state => ({
		dialog: state.dialogInput,
	}),
	dispatch => ({
		createOpen  : () => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_OPEN`}),
	})
)(ToolsBar);
