import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
	PREFIX_CONTAINER_STATS
} from '../../../const/prefix'

import {containerStatsById} from '../../../api/api';
import LoadAnimation from "../../tools/LoadAnimation";

const PREFIX_KEY = 'prop_stats_container';

const fieldsLabel = [
	'NAME',
	'id',
	'CPU %',
	'MEM USAGE / LIMIT',
	'MEM %',
	'NET I/O',
	'BLOCK I/O',
	'PIDS'
];

const ContainerStats = (state) => {

	const handelUpdate = async () => {
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
				{fieldsLabel.map(prop => <TextField
					key={PREFIX_KEY + '_' + prop}
					value={state.store[prop]}
					floatingLabelText={prop}
				/>)}

			</Dialog>
		</span>
	);
};

export default connect(
	state => ({
		store : state.containerStats,
	}),
	dispatch => ({
		load     : ()     => dispatch({type: `${PREFIX_CONTAINER_STATS}_LOAD`}),
		loadStop : ()     => dispatch({type: `${PREFIX_CONTAINER_STATS}_LOAD_STOP`}),
		close    : ()     => dispatch({type: `${PREFIX_CONTAINER_STATS}_CLOSE`}),
		save     : (data) => dispatch({type: `${PREFIX_CONTAINER_STATS}_UPDATE`, data}),
	})
)(ContainerStats);
