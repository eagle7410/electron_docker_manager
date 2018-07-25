import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
	PREFIX_CONTAINER_2_IMAGE,
	PREFIX_IMAGES
} from '../../../const/prefix'
import {containerToImage} from '../../../api/api';

const PREFIX_KEY = 'prop_commit_container';
const requiredProps = ['repository', 'tag'];
const textFieldsLabels = {
	repository : 'Repository',
	tag        : 'Tag',
	message    : 'Message',
	author     : 'Author',
	attach     : 'Attach'
};

const DialogContainerToImage = (state) => {

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
			if (!validate()) return false;

			let data = {};

			for (let prop of Object.keys(textFieldsLabels).concat(['id'])) data[prop] = state.store[prop] || '';

			const {image} = await containerToImage(data);

			state.add(image);
			state.close();

		} catch (e) {
			alert(e.message ? e.message : e);
		}
	};

	return (
		<span >
			<Dialog
				actions={[
					<FlatButton onClick={() => state.close()}  label="Cancel" primary={true} />,
					<FlatButton onClick={() => handelSubmit()} label="Create" primary={true} />,
				]}
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
		store : state.dialogContainerToImage,
		images: state.images,
	}),
	dispatch => ({
		add    : data           => dispatch({type: `${PREFIX_IMAGES}_ADD`, data}),
		errors : data           => dispatch({type: `${PREFIX_CONTAINER_2_IMAGE}_ERRORS`, data}),
		close  : ()             => dispatch({type: `${PREFIX_CONTAINER_2_IMAGE}_CLOSE`}),
		input  : (field, value) => dispatch({type: `${PREFIX_CONTAINER_2_IMAGE}_INPUT`, data : {field, value}}),
	})
)(DialogContainerToImage);
