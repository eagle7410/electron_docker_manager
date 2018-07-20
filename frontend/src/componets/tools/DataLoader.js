import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadAnimation from './LoadAnimation'
import routes from '../../const/app-routes'
import {init} from '../../api/api';

class DataLoader extends Component {
	constructor (props) {
		super(props);

		init().then(
			res => {

				this.props.clearError();

				if (res.isDockerLoad) {
					return this.props.history.push(routes.dockerload);
				}

				if (res.isExistPass === false) {
					return this.props.history.push(routes.pass);
				}

				if (res.isNoDocker) {
					return this.props.history.push(routes.needDocker);
				}

				if (res.isStatus) {
					this.props.setStatuses(res.statuses);
					return this.props.history.push(routes.control);
				}

			},
			e => {
				let setError;

				if (typeof e === "string") setError = e;
				else if (e.message) setError = e.message;
				else setError = JSON.stringify(e, null, '\t');

				this.props.setError(setError);

			}
		);
	}

	render () {
		if (this.props.store.err) {

			return (
				<div>
					<h1>App init error</h1>
					<h1 style={{color: 'red'}}>{this.state.store.err}</h1>
				</div>
			)

		}

		return (
			<div>
				<LoadAnimation/>
			</div>
		);
	}


};

export default connect(
	state => ({
		store: state.dataLoader
	}),
	dispatch => ({
		clearError: () => dispatch({type: 'MOVE_ERROR'}),
		setError: (err) => dispatch({type: 'SET_ERROR', data: err}),
		setStatuses: statuses => dispatch({type: 'SET_STATUSES', statuses}),
	})
)(DataLoader);
