import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadAnimation from './LoadAnimation'
import routes from '../../const/app-routes'
import {init} from '../../api/api';
import {
	PREFIX_CONTAINER,
	PREFIX_IMAGES
} from '../../const/prefix'

class DataLoader extends Component {
	async init () {
		try {

			this.props.clearError();

			let res = await init();

			if (res.isNoDocker) {
				return this.props.history.push(routes.needDocker);
			}

			if (!res.isDockerLoad) {
				return this.props.setError('Docker not loaded. Check this and reload');
			}

			this.props.setDockerInfo(res.dockerInfo);
			this.props.history.push(routes.control);

		} catch (e) {
			let setError;

			if (typeof e === "string") setError = e;
			else if (e.message) setError = e.message;
			else setError = JSON.stringify(e, null, '\t');

			this.props.setError(setError);
		}
	}

	constructor (props) {

		super(props);
		this.init();
	}

	render () {
		if (this.props.store.err) {

			return (
				<div>
					<h1>App init error</h1>
					<h1 style={{color: 'red'}}>{this.props.store.err}</h1>
				</div>
			)

		}
		return (<div><LoadAnimation/></div>);
	}
};

export default connect(
	state => ({
		store: state.dataLoader
	}),
	dispatch => ({
		clearError: () => dispatch({type: 'MOVE_ERROR'}),
		setError: (err) => dispatch({type: 'SET_ERROR', data: err}),
		setDockerInfo: ({containers, images}) => {
			dispatch({type: `${PREFIX_CONTAINER}_INIT`, data: containers});
			dispatch({type: `${PREFIX_IMAGES}_INIT`, data: images});
		}
	})
)(DataLoader);

