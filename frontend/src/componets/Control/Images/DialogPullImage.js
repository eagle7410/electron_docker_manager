import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LoadAnimation from '../../tools/LoadAnimation'
import {PREFIX_IMAGE_PULL_DIALOG, PREFIX_IMAGES} from '../../../const/prefix';
import {imagePull} from '../../../api/api';

const PREFIX_KEY = 'prop_pull_image';
const requiredProps = ['repository', 'tag'];
const textFieldsLabels = {
	repository : 'Repository',
	tag        : 'Tag',
};
const DialogPullImage = (state) => {
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
		try {
			state.load();

			if (!validate()) return false;

			let data = {};

			for (let prop of Object.keys(textFieldsLabels)) data[prop] = state.store[prop] || '';

			const {image} = await imagePull(data);

			state.add(image);
			state.close();
		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			state.loadStop();
		}
	};

	let actions = [
		<FlatButton onClick={() => state.close()}  label="Cancel" primary={true} />,
		<FlatButton onClick={() => handelSubmit()} label="Pull" primary={true} />,
	];

	if (state.store.isLoad) actions = <LoadAnimation isNoLabel={true}/>;

	return (
		<span>
			<Dialog
				actions={actions}
				modal={true}
				open={state.store.isOpen}
			>
				{Object.keys(textFieldsLabels).map((prop, inx) => {
					return (
						<div key={`div_${PREFIX_KEY}_${inx}`}>
							<TextField
								key={PREFIX_KEY + inx}
								value={state.store[prop]}
								floatingLabelText={textFieldsLabels[prop]}
								errorText={state.store.errors[prop] || ''}
								onChange={(event, string) => state.input(prop, string)}
							/>
						</div>
					);
				})}
			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		store: state.dialogPullImage
	}),
	dispatch => ({
		add      : data           => dispatch({type: `${PREFIX_IMAGES}_ADD`, data}),
		errors   : data           => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_ERRORS`, data}),
		close    : ()             => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_CLOSE`}),
		input    : (field, value) => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_INPUT`, data : {field, value}}),
		load     : ()             => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_LOAD`}),
		loadStop : ()             => dispatch({type: `${PREFIX_IMAGE_PULL_DIALOG}_LOAD_STOP`}),
	})
)(DialogPullImage);
