import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {renameContainer} from '../../../api/api';
import {connect} from "react-redux";

const INPUT_DIALOG_PREFIX = 'INPUT_DIALOG';

const ButtonRename = (state) => {
	const handleSubmit = async(dialog) => {
		try {
			const id = state.row['CONTAINER ID'];
			let data = await renameContainer(id, dialog.input);

			state.change(data);
			state.close();

		} catch (e) {
			alert(e.message ? e.message : e);
		}
	};

	return (
		<span >
			<RaisedButton label="Rename" onClick={() => state.open(handleSubmit)} />
		</span>
	);
};

export default connect(
	state => ({
		dialog: state.dialogInput,
	}),
	dispatch => ({
		open   : (call) => dispatch({type: `${INPUT_DIALOG_PREFIX}_OPEN`, data : {
			label      : 'Enter new name',
			callSubmit : call
		}}),
		close  : ()    => dispatch({type: `${INPUT_DIALOG_PREFIX}_CLOSE`}),
		change : data  => dispatch({type: 'CONTAINER_CHANGE', data})
	})
)(ButtonRename);
