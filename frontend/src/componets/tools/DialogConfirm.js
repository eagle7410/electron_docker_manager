import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from "react-redux";
import {PREFIX_CONFIRM_DIALOG} from '../../const/prefix'

const DialogConfirm = (state) => {

	const actions = [
		<FlatButton
			label="Cancel"
			primary={true}
			onClick={() => state.close()}
		/>,
		<FlatButton
			label="Confirm"
			secondary={true}
			onClick={() => state.confirm.callConfirm()}
		/>,
	];

	return (
		<span >
			<Dialog
				actions={actions}
				modal={true}
				open={state.confirm.isOpen}
			>
				{state.confirm.question}
			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		confirm: state.dialogConfirm,
	}),
	dispatch => ({
		close  : () => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_CLOSE`}),
	})
)(DialogConfirm);
