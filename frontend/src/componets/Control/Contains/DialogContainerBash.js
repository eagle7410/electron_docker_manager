import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/content-copy';
import AvLoop from 'material-ui/svg-icons/av/loop';

import {
	PREFIX_CONTAINER_BASH
} from '../../../const/prefix'

import {containerBashExec} from '../../../api/api';

const PREFIX_KEY = 'prop_bash_container';
const requiredProps = ['command'];

const textFieldsLabels = {
	command    : 'Command'
};

const DialogContainerBash = (state) => {

	const validate = () => {
		let errors = {};

		state.errors(errors);

		for (let prop of requiredProps) if (!state.store[prop]) errors[prop] = 'This field is required.';

		if (Object.keys(errors).length) {

			state.errors(errors);

			return false;
		}

		return true;
	};

	const handelSubmit = async () => {

		state.load();

		try {
			if (!validate()) return false;

			let data = {};

			for (let prop of Object.keys(textFieldsLabels)) data[prop] = state.store[prop] || '';

			await containerBashExec(data);

			state.exec();

		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			state.loadStop();
		}
	};

	const handlerCopyCmd = () => {
		let $buffer = document.createElement('input');
		document.body.appendChild($buffer);
		$buffer.value = state.store.dockerCmd;
		$buffer.select();
		document.execCommand('copy',false);
		$buffer.remove();
	};

	return (
		<span >
			<Dialog
				actions={[
					<FlatButton onClick={() =>  state.close()}  label="Close" primary={true} />,
				]}
				modal={true}
				open={state.store.isOpen}
			>
				<div key={`div_${PREFIX_KEY}_docker_cmd`}>
					<FloatingActionButton
						mini={true}
						style={{marginRight : 5}}
						onClick={handlerCopyCmd}
					>
						<ContentSave />
				    </FloatingActionButton>
					<TextField
						key={PREFIX_KEY + '_docker_cmd'}
						value={state.store.dockerCmd}
						floatingLabelText={'Command for open in console'}
					/>
				</div>
				<div key={`div_${PREFIX_KEY}_command`}>
					<FloatingActionButton
						mini={true}
						style={{marginRight : 5}}
						secondary={state.store.isLoad}
						className={state.store.isLoad ? 'wait-update-status' : ''}
						onClick={() => handelSubmit()}
					>
						{ state.store.isLoad ? <AvLoop /> : <ContentAdd/> }
				    </FloatingActionButton>
					<TextField
						key={PREFIX_KEY + '_command'}
						value={state.store.command}
						floatingLabelText={textFieldsLabels.command}
						errorText={state.store.errors.command || ''}
						onChange={(event, string) => state.input('command', string)}
						onKeyDown={(event) => {
							if (event.keyCode === 13 && state.store.command)
								handelSubmit();
						}}
						disabled={state.store.isLoad}
					/>
				</div>
				<div key={`div_${PREFIX_KEY}_out`}>
					<TextField
						key={PREFIX_KEY + '_out'}
						value={state.store.out}
						floatingLabelText={'Console log'}
						rows={10}
						rowsMax={10}
						multiLine={true}
						fullWidth={true}
					/>

				</div>
			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		store : state.dialogContainerBash,
	}),
	dispatch => ({
		load     : ()             => dispatch({type: `${PREFIX_CONTAINER_BASH}_LOAD`}),
		loadStop : ()             => dispatch({type: `${PREFIX_CONTAINER_BASH}_LOAD_STOP`}),
		errors   : data           => dispatch({type: `${PREFIX_CONTAINER_BASH}_ERRORS`, data}),
		exec     : data           => dispatch({type: `${PREFIX_CONTAINER_BASH}_EXEC`}),
		close    : ()             => dispatch({type: `${PREFIX_CONTAINER_BASH}_CLOSE`}),
		input    : (field, value) => dispatch({type: `${PREFIX_CONTAINER_BASH}_INPUT`, data : {field, value}}),
	})
)(DialogContainerBash);
