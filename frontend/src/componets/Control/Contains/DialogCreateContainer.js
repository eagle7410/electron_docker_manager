import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
	PREFIX_CREATE_CONTAINER_DIALOG,
	PREFIX_CONTAINER
} from '../../../const/prefix';
import {createContainer} from '../../../api/api';

const DialogCreateContainer = (state) => {
	const imageList = state.images.data.map(image => `${image.REPOSITORY}:${image.TAG}`);
	const containerList = state.containers.data.map(container => ({
		value : container['CONTAINER ID'],
		label : `${container['CONTAINER ID']} | ${container.NAMES}| ${container.IMAGE})`
	}));

	const required = ['name', 'portInner', 'portExternal', 'image'];

	const validate = () => {
		let errors = {};

		state.errors(errors);

		for (let prop of required) if (!state.store[prop].length) errors[prop] = 'This field is required.';

		const numbers = ['portInner', 'portExternal'];

		for (let prop of numbers) if (isNaN(state.store[prop])) errors[prop] = 'This field is must be number.';

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

			for (let prop of required.concat(['attach', 'volumesFrom'])) data[prop] = state.store[prop] || '';

			const container = await createContainer(data);

			state.add(container);
			state.close();


		} catch (e) {
			alert(e.message ? e.message : e);
		}
	};

	const actions = [
		<FlatButton onClick={() => state.close()} label="Cancel" primary={true} />,
		<FlatButton onClick={() => handelSubmit()} label="Submit" primary={true} />,
	];

	const textFieldsLabels = {
		name: 'Name',
		portInner: 'Inner port',
		portExternal: 'External port',
		attach: 'Attach',
	};

	return (
		<span >
			<Dialog
				actions={actions}
				modal={true}
				open={state.store.isOpen}
			>
				<SelectField
					floatingLabelText="Image?"
					value={state.store.image}
					onChange={(event, index, string) => state.input('image', string)}
					errorText={state.store.errors.image || ''}
				>
					{imageList.map((image, inx) => (<MenuItem value={image} primaryText={image} key={'prop_create_container_image_' + inx} />))}
		        </SelectField><br/>

				<SelectField
					floatingLabelText="Volume from container?"
					value={state.store.volumesFrom}
					onChange={(event, index, string) => state.input('volumesFrom', string)}
					errorText={state.store.errors.volumesFrom || ''}
				>
					{containerList.map((item, inx) => (
						<MenuItem value={item.value} primaryText={item.label} key={'prop_create_container_volumesFrom_' + inx} />)
					)}
		        </SelectField>

				{Object.keys(textFieldsLabels).map((prop, inx) => {
					return (
						<div key={'div_prop_create_container_' + inx}>
							<TextField
								key={'prop_create_container_' + inx}
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
		containers : state.containers,
		store      : state.dialogCreateContainer,
		images     : state.images,
	}),
	dispatch => ({
		add    : data           => dispatch({type: `${PREFIX_CONTAINER}_ADD`, data}),
		errors : data           => dispatch({type: `${PREFIX_CREATE_CONTAINER_DIALOG}_ERRORS`, data}),
		close  : ()             => dispatch({type: `${PREFIX_CREATE_CONTAINER_DIALOG}_CLOSE`}),
		input  : (field, value) => dispatch({type: `${PREFIX_CREATE_CONTAINER_DIALOG}_INPUT`, data : {field, value}}),
	})
)(DialogCreateContainer);
