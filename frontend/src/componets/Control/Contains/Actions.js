import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import {renameContainer} from '../../../api/api';
import {connect} from "react-redux";

const INPUT_DIALOG_PREFIX = 'INPUT_DIALOG';

const Actions = (state) => {
	const handleRename = async(dialog) => {
		try {
			const id = state.row['CONTAINER ID'];
			let data = await renameContainer(id, dialog.input);

			state.containerChange(data);
			state.renameClose();

		} catch (e) {
			alert(e.message ? e.message : e);
		}
	};

	return (
	<span>
		<IconMenu
			iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
		>
			<Divider />
			<MenuItem primaryText="Rename" onClick={() => state.renameOpen(handleRename)}/>
			<MenuItem primaryText="Delete"/>
			<Divider />
			<MenuItem primaryText="Cancel"/>
	    </IconMenu>
	</span>

	);
};

export default connect(
	state => ({
		dialog: state.dialogInput,
	}),
	dispatch => ({
		renameOpen   : (call) => dispatch({type: `${INPUT_DIALOG_PREFIX}_OPEN`, data : {
			label      : 'Enter new name',
			callSubmit : call
		}}),
		renameClose     : ()    => dispatch({type: `${INPUT_DIALOG_PREFIX}_CLOSE`}),
		containerChange : data  => dispatch({type: 'CONTAINER_CHANGE', data})
	})
)(Actions);
