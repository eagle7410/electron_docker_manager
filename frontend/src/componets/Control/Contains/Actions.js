import React from 'react';
import {connect} from "react-redux";

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import {
	renameContainer,
	deleteContainer,
	containerEditLabelPorts,
} from '../../../api/api';

const PREFIX_CONTAINER_2_IMAGE = 'CREATE_IMAGE_FROM_CONTAINER_DIALOG';
const INPUT_DIALOG_PREFIX      = 'INPUT_DIALOG';
const CONFIRM_DIALOG_PREFIX    = 'CONFIRM_DIALOG';

const Actions = (state) => {
	const id = state.row['CONTAINER ID'];
	const handelTry = async (call, finish) => {
		try {
			await call();
		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			if (finish) finish();
		}
	};

	const handleDelete = () => handelTry(async () => {
		await deleteContainer(id);
		state.containerDeleted(id);
	}, state.deleteClose);

	const handleRename = (dialog) => handelTry(async () => {
		const updatedContainer = await renameContainer(id, dialog.input);
		state.containerChange(updatedContainer);
	}, state.inputDialogClose);

	const handleContainer2Image = () => {
		let repository = state.row.IMAGE;

		let image = state.images.data.find(image => image['IMAGE ID'] === repository);

		if (image) repository = image.REPOSITORY;

		state.container2ImageOpen({repository, id})
	};

	const handleEditLabelPorts = () => {
		state.editLabelPorts(state.row.LABEL_PORTS, (dialog) => handelTry(async () => {
			let data = {id, labelPorts : dialog.input || ''};

			await containerEditLabelPorts(data);

			state.containerChangeLabelPorts(data);

		}, state.inputDialogClose));
	};

	return (
	<span>
		<IconMenu
			iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
		>
			<Divider />
			<MenuItem primaryText="Edit label ports" onClick={() => handleEditLabelPorts()} />
			<MenuItem primaryText="Rename"           onClick={() => state.renameOpen(handleRename)}/>
			<MenuItem primaryText="Delete"           onClick={() => state.confirmDeleteOpen(handleDelete)}/>
			<MenuItem primaryText="Commit to image"  onClick={() => handleContainer2Image()} />
			<MenuItem primaryText="Bash"             onClick={() => {alert('No implement')}} />
			<Divider />
			<MenuItem primaryText="Cancel"/>
	    </IconMenu>
	</span>

	);
};

export default connect(
	state => ({
		dialog : state.dialogInput,
		images : state.images
	}),
	dispatch => ({
		container2ImageOpen : (data) => dispatch({type: `${PREFIX_CONTAINER_2_IMAGE}_OPEN`, data}),
		editLabelPorts      : (input, call) => dispatch({type: `${INPUT_DIALOG_PREFIX}_OPEN`, data : {
			label      : 'Edit label ports',
			callSubmit : call,
			input
		}}),
		renameOpen          : (call) => dispatch({type: `${INPUT_DIALOG_PREFIX}_OPEN`, data : {
			label      : 'Enter new name',
			callSubmit : call
		}}),
		confirmDeleteOpen  : (call) => dispatch({type: `${CONFIRM_DIALOG_PREFIX}_OPEN`, data : {
			question    : 'You is sure?',
			callConfirm : call
		}}),
		inputDialogClose          : ()    => dispatch({type: `${INPUT_DIALOG_PREFIX}_CLOSE`}),
		deleteClose               : ()    => dispatch({type: `${CONFIRM_DIALOG_PREFIX}_CLOSE`}),
		containerChangeLabelPorts : data  => dispatch({type: 'CONTAINER_CHANGE_LABEL_PORTS', data}),
		containerChange           : data  => dispatch({type: 'CONTAINER_CHANGE', data}),
		containerDeleted          : id    => dispatch({type: 'CONTAINER_DELETE', data : id})
	})
)(Actions);
