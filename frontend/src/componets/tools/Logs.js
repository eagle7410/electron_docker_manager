import React from 'react';
import {connect} from 'react-redux';

const style = {
	padding : 10,
	maxHeight : 200,
	overflowY: 'scroll'
}

const Logs = (state) => {

	if (!state.store.logs.length)
		return false;

	let logs = state.store.logs.map(function(log, inx) { return (<div style={{color: 'blue'}} key={'log-num-' + inx}>{log}</div>) });

	return (
		<div style={style}>
			{logs}
		</div>
	);
};

export default connect(
	state => ({
		store: state.dataLoader
	})
)(Logs);
