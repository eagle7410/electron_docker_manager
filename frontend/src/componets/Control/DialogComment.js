import React from 'react';
import {connect} from 'react-redux';
import Dialog from "material-ui/Dialog/index";
import TextField from "material-ui/TextField/index";
import FlatButton from 'material-ui/FlatButton';
import {
	PREFIX_COMMENT, PREFIX_CONFIRM_DIALOG
} from '../../const/prefix'
import {commentSave} from '../../api/api'

const requiredProp = ['type', 'id'];
const allProps = ['comment'].concat(requiredProp);

const DialogComment = (state) => {

	const validate = () => {
		let errors = {};

		state.errors(errors);

		for (let prop of ['type', 'id']) if (!state.store[prop]) errors.comment = `The ${prop} is required.`;

		if (Object.keys(errors).length) {

			state.errors(errors);

			return false;
		}

		return true;
	};

	const handlerSave = async () => {
		state.confirmEditClose();

		if (!validate()) return false;

		let data = {};
		for(let prop of allProps ) data[prop] = state.store[prop] || '';

		try {
			await commentSave(data);

			state.save(data);
			state.onClose();

		} catch (e) {
			alert(e.message ? e.message : e);
		}

	};

	return (
		<span >
			<Dialog
				actions={[
					<FlatButton
						label="Cancel"
						primary={true}
						onClick={() => state.onClose()}
					/>,
					<FlatButton
						label="Save"
						primary={true}
						onClick={() => state.confirmEditOpen(handlerSave)}
					/>,
				]}
				modal={true}
				open={state.store.isOpen}
			>
				<TextField
					value={state.store.comment}
					onChange={(event, string) => state.onInput(string)}
					key={PREFIX_COMMENT + '_Comment'}
					floatingLabelText={'Comment'}
					errorText={state.store.errors.comment || ''}
					rowsMax={10}
					multiLine={true}
					fullWidth={true}
				/>
			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		store: state.dialogComment
	}),
	dispatch => ({
		confirmEditClose : ()     => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_CLOSE`}),
		confirmEditOpen  : (call) => dispatch({type: `${PREFIX_CONFIRM_DIALOG}_OPEN`, data : {
			question    : 'You is sure?',
			callConfirm : call
		}}),
		save : data => dispatch({type : `${PREFIX_COMMENT}_SAVE`, data}),
		onClose : () => dispatch({type : `${PREFIX_COMMENT}_CLOSE`}),
		onInput : (data) => dispatch({type : `${PREFIX_COMMENT}_INPUT`, data}),
		errors  : (data) => dispatch({type : `${PREFIX_COMMENT}_ERRORS`, data}),
	})
)(DialogComment);
