import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
	PREFIX_CONTAINER_LOGS_DIALOG
} from '../../../const/prefix';

import {containerLogs} from '../../../api/api';
import LoadAnimation from "../../tools/LoadAnimation";

const PREFIX_KEY = 'prop_container_logs';
const textFieldsLabels = {countLines: 'Count lasted lines from log'};
const customContentStyle = {
	width: '100%',
	maxWidth: 'none',
};
const styleTextArea = {
	padding: 0,
	position: 'relative',
	width: '100%',
	border: 'none',
	outline: 'none',
	backgroundColor: 'rgba(0, 0, 0, 0)',
	color: 'rgba(0, 0, 0, 0.87)',
	height: '100%',
	boxSizing: 'border-box',
	marginTop: 14
};

const DialogContainerLogs = (state) => {


	const required = ['countLines'];

	const validate = () => {
		let errors = {};

		state.errors(errors);

		for (let prop of required) if (!String(state.logs[prop]).length) errors[prop] = 'This field is required.';

		const numbers = ['countLines'];

		for (let prop of numbers) if (isNaN(state.logs[prop])) errors[prop] = 'This field is must be number.';

		if (Object.keys(errors).length) {

			state.errors(errors);

			return false;
		}

		return true;
	};

	const handelSubmit = async () => {

		try {
			if (!validate()) return false;

			state.load();

			let data = {};

			for (let prop of required.concat(['containerId'])) data[prop] = state.logs[prop] || '';

			data = await containerLogs(data);

			state.add(data);

		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			state.loadStop();
		}
	};

	let actions = [
		<FlatButton onClick={() => state.close()} label="Close" primary={true} />,
		<FlatButton onClick={() => handelSubmit()} label="Get" primary={true} />,
	];

	if (state.logs.isLoad) actions = <LoadAnimation isNoLabel={true}/>;

	let text = (
		<div key={`div_${PREFIX_KEY}_text`}>
			<textarea style={styleTextArea} rows={20}>{state.logs.text}</textarea>
		</div>
	);

	if (!state.logs.text) text = '';

	return (
		<span >
			<Dialog
				actions={actions}
				modal={true}
				open={state.logs.isOpen}
				contentStyle={customContentStyle}
			>
				<div>Log container {state.logs.containerId}</div>
				{Object.keys(textFieldsLabels).map((prop, inx) => {
					return (
						<div key={`div_${PREFIX_KEY}_${inx}`}>
							<TextField
								key={PREFIX_KEY + inx}
								value={state.logs[prop]}
								floatingLabelText={textFieldsLabels[prop]}
								errorText={state.logs.errors[prop] || ''}
								onChange={(event, string) => state.input(prop, string)}
							/>
						</div>
					);
				})}
				{text}
			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		containers : state.containers,
		logs       : state.dialogContainerLogs
	}),
	dispatch => ({
		load     : ()             => dispatch({type: `${PREFIX_CONTAINER_LOGS_DIALOG}_LOAD`}),
		loadStop : ()             => dispatch({type: `${PREFIX_CONTAINER_LOGS_DIALOG}_LOAD_STOP`}),
		add      : data           => dispatch({type: `${PREFIX_CONTAINER_LOGS_DIALOG}_ADD`, data}),
		errors   : data           => dispatch({type: `${PREFIX_CONTAINER_LOGS_DIALOG}_ERRORS`, data}),
		close    : ()             => dispatch({type: `${PREFIX_CONTAINER_LOGS_DIALOG}_CLOSE`}),
		input    : (field, value) => dispatch({type: `${PREFIX_CONTAINER_LOGS_DIALOG}_INPUT`, data : {field, value}}),
	})
)(DialogContainerLogs);
