import React from 'react';
import PasswordField from 'material-ui-password-field'
import RaisedButton from 'material-ui/RaisedButton'
import IconSave from 'material-ui/svg-icons/content/save';
import {savePass} from '../../api/api';
import {connect} from 'react-redux';

const Password = (state, ) => {

	const handlerSave = async () => {
		try {
			let pass = state.store.pass;

			if (!pass) {
				return state.setErr('Password not empty');
			}

			await savePass(pass);

			state.history.push('/')

		} catch (err) {
			if (err && err.type === 'badPass') {
				return state.setErr('Invalid password');
			}

			console.error(`Error save password`, err);

			state.setErr('Error save password');
		}
	};

	return (
		<div>
			<PasswordField
				floatingLabelText="User root password?"
				onChange={ev => { state.setPass((ev.target|| {}).value) }}
				errorText={state.store.err}
			/><br/>

			<RaisedButton
				label="Save"
				icon={<IconSave />}
				onClick={handlerSave}
				primary={true}
			/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.pass
	}),
	dispatch => ({
		setErr  : (err)  => dispatch({type: 'PASS_ERROR', err}),
		setPass : (pass) => dispatch({type: 'PASS_SET'  , pass}),
	})
)(Password);
