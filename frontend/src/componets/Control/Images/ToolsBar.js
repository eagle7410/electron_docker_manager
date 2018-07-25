import React from 'react';
import {connect} from "react-redux";
import {PREFIX_IMAGE_PULL_DIALOG} from '../../../const/prefix';
import RaisedButton from 'material-ui/RaisedButton';
import IconPull from 'material-ui/svg-icons/file/cloud-download';
import IconLoad from 'material-ui/svg-icons/action/get-app';
import DialogPullImage from './DialogPullImage';

const ToolsBar = (state) => {
	return (
		<span>
			<RaisedButton
				label="Pull image"
				primary={true}
				icon={<IconPull/>}
				onClick={state.dialogPullOpen}
			/>
			<RaisedButton
				label="Image load"
				primary={true}
				icon={<IconLoad/>}
				onClick={() => alert('not implement')}
			/>
			<DialogPullImage />
		</span>
	);
};

export default connect(
	state => ({}),
	dispatch => ({
		dialogPullOpen  : () => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_OPEN`}),
	})
)(ToolsBar);
