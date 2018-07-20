import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import IconOn from 'material-ui/svg-icons/image/flash-on';
import IconOff from 'material-ui/svg-icons/image/flash-off';
import IconUpdate from 'material-ui/svg-icons/action/update';
import {toggleService} from '../../api/api';

const styles = {
	img: {
		height: 50,
		marginRight: 15,
	},
	box: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},
};

const ButtomStatus = (state) => {
	let style = styles.box;
	let img = <img src={state.imgSrc} className='App-logo' alt={state.label} style={styles.img}/>;
	let disabled = false;
	let secondary = false;
	let icon = <IconOff/> ;
	let cls = '';
	let bg = "";

	if (state.store[state.service]) {
		icon = <IconOn/>;
		secondary = true;
	}

	if (state.store.wait === state.service) {
		cls = 'wait-update-status';
		secondary = false;
		bg = "#FFF59D";
		icon = <IconUpdate />;
	} else if(state.store.wait) {
		disabled = true;
	}

	const handlerClick = async () => {
		try {
			state.wait(state.service);

			let data = await toggleService(state.service);

			state.change(data);

		} catch (e) {
			alert('Error change status')
		}

	};

	const port = state.store.ports[state.service];
	const portLabel = port ? `PORT: ${port}` : '';

	return (
		<div style={style}>
			{img}
			<RaisedButton
				className={cls}
				backgroundColor={bg}
				label={`${state.label} ${portLabel}`}
				icon={icon}
				secondary={secondary}
				disabled={disabled}
				onClick={handlerClick}
			/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.control
	}),
	dispatch => ({
		wait   : service => dispatch({type: 'WAIT', service}),
		change : data    => dispatch({type: 'STATUS_CHANGE', ...data})
	})
)(ButtomStatus);
