import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isDockerLoad} from '../../api/api'

class DockerLoad extends Component {
	constructor(props){
		super(props);
		this.waitLoading();
	}

	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.props.nextPoint()
		}, 1000);
	}

	timeOut (ms) {
		return new Promise(ok => {
			setTimeout(ok, ms)
		})
	}
	async waitLoading () {
		let stop = false;

		while (!stop) {
			let data = await isDockerLoad();

			if (data.isDockerLoaded) {
				stop = true
			} else {
				await this.timeOut(10000);
			}
		}

		this.props.history.push('/');
	}

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.intervalId);
	}

	render() {
		return (
			<div>
				<p>{this.props.store.labelDockerLoad} <span style={{position: 'absolute'}}>{this.props.store.labelDockerLoadPoints}</span></p>
				<img src='img/docker-loading.gif' style={{height: 300, width: 300}} alt='docker '/>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state.dataLoader
	}),
	dispatch => ({
		nextPoint: () => dispatch({type: 'DOCKER_LOAD_NEXT_POINT'}),
	})
)(DockerLoad);

