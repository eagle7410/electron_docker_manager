import React from 'react';
import {connect} from "react-redux";

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import {
	PREFIX_IMAGES,
	PREFIX_CONFIRM_DIALOG,
	PREFIX_INPUT_DIALOG,
} from '../../../const/prefix';
import {
	saveFilePath,
	imageSave,
	imageDelete,
	imageEditLabelPorts,
} from '../../../api/api';


const Actions = (state) => {
	const id = state.row['IMAGE ID'];
	const handelTry = async (call, finish, cancel) => {

		state.wait(id);

		try {
			await call();
		} catch (e) {
			alert(e.message ? e.message : e);
			if (cancel) cancel();
		} finally {
			state.waitStop(id);

			if (finish) finish();
		}
	};

	const handelSave = () => handelTry(async () => {
		const {path} = await saveFilePath();

		if (!path) return false;

		await imageSave({id, path});

		alert('Saving image ok :) ...');
	});

	const handelDelete = () => handelTry(async () => {
		state.confirmDeleteClose();
		await imageDelete({id});
		state.imageDelete(id);
	}, null, state.confirmDeleteClose);

	const handleEditLabelPorts = () => {
		state.editLabelPorts(state.row.LABEL_PORTS, (dialog) => handelTry(async () => {
			let data = {id, labelPorts : dialog.input || ''};

			await imageEditLabelPorts(data);

			state.imageChangeLabelPorts(data);

		}, state.editLabelPortsClose));
	};

	let content = (<IconMenu
		iconButtonElement={<IconButton className={state.images.wait === id ? 'wait-update-status' : ''}><MoreVertIcon /></IconButton>}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
	>
		<Divider />
		<MenuItem primaryText="Delete" onClick={() => state.confirmDeleteOpen(handelDelete)}/>
		<MenuItem primaryText="Save"   onClick={handelSave} />
		<MenuItem primaryText="Edit label ports" onClick={() => handleEditLabelPorts()} />

		<Divider />
		<MenuItem primaryText="Cancel"/>
	</IconMenu>);

	return <span>{state.images.wait && state.images.wait !== id ? '' : content}</span>;
};

export default connect(
	state => ({
		dialog : state.dialogInput,
		images : state.images
	}),
	dispatch => ({
		wait     : (data)           => dispatch({type: `${PREFIX_IMAGES}_WAIT`, data}),
		waitStop : ()               => dispatch({type: `${PREFIX_IMAGES}_WAIT_STOP`}),
		imageDelete : (data)        => dispatch({type: `${PREFIX_IMAGES}_DELETE`, data}),
		confirmDeleteClose : ()     => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_CLOSE`}),
		confirmDeleteOpen  : (call) => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_OPEN`, data : {
			question    : 'You is sure?',
			callConfirm : call
		}}),
		editLabelPortsClose : ()    => dispatch({type: `${PREFIX_INPUT_DIALOG}_CLOSE`}),
		editLabelPorts      : (input, call) => dispatch({type: `${PREFIX_INPUT_DIALOG}_OPEN`, data : {
			label      : 'Edit label ports',
			callSubmit : call,
			input
		}}),
		imageChangeLabelPorts : data  => dispatch({type: `${PREFIX_IMAGES}_CHANGE_LABEL_PORTS`, data}),
	})
)(Actions);
