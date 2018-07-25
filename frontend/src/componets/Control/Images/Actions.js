import React from 'react';
import {connect} from "react-redux";

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import {
	PREFIX_IMAGES,
	PREFIX_CONFIRM_DIALOG
} from '../../../const/prefix';
import {
	saveFilePath,
	imageSave,
	imageDelete,
} from '../../../api/api';


const Actions = (state) => {
	const id = state.row['IMAGE ID'];
	const handelTry = async (call, finish) => {

		state.wait(id);

		try {
			await call();
		} catch (e) {
			alert(e.message ? e.message : e);
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
		await imageDelete({id});
	});
	let content = (<IconMenu
		iconButtonElement={<IconButton className={state.images.wait === id ? 'wait-update-status' : ''}><MoreVertIcon /></IconButton>}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
	>
		<Divider />
		<MenuItem primaryText="Delete" onClick={() => state.confirmDeleteOpen(handelDelete)}/>
		<MenuItem primaryText="Save"   onClick={handelSave} />

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
		wait     : (data) => dispatch({type: `${PREFIX_IMAGES}_WAIT`, data}),
		waitStop : ()     => dispatch({type: `${PREFIX_IMAGES}_WAIT_STOP`}),
		confirmDeleteOpen  : (call) => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_OPEN`, data : {
			question    : 'You is sure?',
			callConfirm : call
		}}),
	})
)(Actions);
