import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import IconOn from 'material-ui/svg-icons/image/flash-on';
import IconOff from 'material-ui/svg-icons/image/flash-off';
import IconUpdate from 'material-ui/svg-icons/action/update';
import {PREFIX_CONTAINER} from '../../../const/prefix'
import {toggleContainer} from '../../../api/api';

const ButtomStatus = (state) => {
	let disabled  = false;
	let secondary = false;
	let label     = 'RUN';
	let icon      = <IconOn/> ;
	let cls       = '';
	let bg        = '';

	const isRun = state.row.STATUS.substring(0, 3) === 'Up ';
	const id    = state.row['CONTAINER ID'];

	if (isRun) {
		icon      = <IconOff/>;
		secondary = true;
		label     = 'STOP';
	}

	if (state.store.wait === id) {
		cls       = 'wait-update-status';
		secondary = false;
		bg        = "#FFF59D";
		icon      = <IconUpdate />;
		label     = 'Loading';
	} else if(state.store.wait) {
		disabled  = true;
		label     = 'loading';
	}

	const handlerClick = async () => {
		let data = {container : {}};

		try {
			state.wait(id);
			data = await toggleContainer(id, isRun);
		} catch (e) {
			alert(e.message ? e.message : e);
		} finally {
			state.change(data);
		}
	};

	return (
		<RaisedButton
			className={cls}
			backgroundColor={bg}
			label={label}
			icon={icon}
			secondary={secondary}
			disabled={disabled}
			onClick={handlerClick}
			style={{top:-8, position : 'relative'}}
		/>
	);
};

export default connect(
	state => ({
		store: state.containers
	}),
	dispatch => ({
		wait   : id   => dispatch({type: `${PREFIX_CONTAINER}_WAIT_CHANGE_STATUS`, data: id}),
		change : data => dispatch({type: `${PREFIX_CONTAINER}_CHANGE`, data})
	})
)(ButtomStatus);
