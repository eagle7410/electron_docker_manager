import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
	PREFIX_CONTAINER_BASH,
	PREFIX_CONTAINER_LIMITS as PREFIX
} from '../../../const/prefix'

import {containerLimits} from '../../../api/api';
import LoadAnimation from "../../tools/LoadAnimation";

const PREFIX_KEY = 'prop_container_limits';

const fieldsLabel = {
	id     : 'CONTAINER ID',
	cpus   : 'CPUS',
	memory : 'Memory MB',
};

const ContainerLimits = (state) => {

	const validate = () => {
		let errors = {};

		state.errors(errors);

		const numbers = ['cpus', 'memory'];

		for (let prop of numbers) if (state.store[prop] && isNaN(state.store[prop])) errors[prop] = 'This field is must be number.';

		if (Object.keys(errors).length) {

			state.errors(errors);

			return false;
		}

		return true;
	};

	const handelUpdate = async () => {
		if (!validate()) return false;

		let count = 0;
		let data  = {};

		for(const prop of Object.keys(fieldsLabel) ) data[prop] = state.store[prop];

		if (Object.keys(data).length < 1)
			return alert('Nothing change');

		state.load();

		try {
			state.save(await containerStatsById(state.store.id));
		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			state.loadStop();
		}
	};

	let actions = [
		<FlatButton onClick={() => state.close()}  label="Close" primary={true} />,
		<FlatButton onClick={() => handelUpdate()}  label="Update" primary={true} />,
	];

	if (state.store.isLoad) actions = <LoadAnimation isNoLabel={true}/>;

	return (
		<span >
			<Dialog
				actions={actions}
				modal={true}
				open={state.store.isOpen}
			>
				{Object.keys(fieldsLabel).map(prop =>
					<div>
						<TextField
							key={PREFIX_KEY + '_' + prop}
							value={state.store[prop]}
							floatingLabelText={fieldsLabel[prop]}
							onChange={(event, string) => state.input(prop, string)}
							errorText={state.store.errors[prop] || ''}
						/>
					</div>
				)}

			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		store : state.containerLimits,
	}),
	dispatch => ({
		errors   : data           => dispatch({type: `${PREFIX}_ERRORS`, data}),
		input    : (field, value) => {
			if (field === 'id' ) return false;

			dispatch({type: `${PREFIX}_CHANGE_FIELD`, field, value});
		},
		load     : ()     => dispatch({type: `${PREFIX}_LOAD`}),
		loadStop : ()     => dispatch({type: `${PREFIX}_LOAD_STOP`}),
		close    : ()     => dispatch({type: `${PREFIX}_CLOSE`}),
		save     : (data) => dispatch({type: `${PREFIX}_UPDATE`, data}),
	})
)(ContainerLimits);
