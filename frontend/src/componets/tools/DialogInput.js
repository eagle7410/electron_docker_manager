import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {connect} from "react-redux";

const INPUT_DIALOG_PREFIX = 'INPUT_DIALOG';

const DialogInput = (state) => {

	console.log('state.dialog', state.dialog);

	const actions = [
		<FlatButton
			label="Cancel"
			primary={true}
			onClick={() => state.close()}
		/>,
		<FlatButton
			label="Submit"
			primary={true}
			disabled={!state.dialog.input.length}
			onClick={() => state.dialog.callSubmit(state.dialog)}
		/>,
	];

	return (
		<span >
			<Dialog
				actions={actions}
				modal={true}
				open={state.dialog.isOpen}
			>
				<TextField
					value={state.dialog.input}
					hintText={state.dialog.label}
					onChange={(event, string) => state.input(string)}
				/>
			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		dialog: state.dialogInput,
	}),
	dispatch => ({
		close  : ()      => dispatch({type: `${INPUT_DIALOG_PREFIX}_CLOSE`}),
		input  : (input) => dispatch({type: `${INPUT_DIALOG_PREFIX}_INPUT`, data : {input}}),
	})
)(DialogInput);
