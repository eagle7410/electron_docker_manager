// eslint-disable-next-line
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SocketClient from "../../utils/SocketClient";


const socketClient = new SocketClient();
class SocketListen extends Component {
	constructor(props){
		super(props);
		socketClient.on('log-add', this.props.addLog);
	}

	render () {
		return this.props.children;
	}
}

export default connect(
	state => ({
		store: state.dataLoader
	}),
	dispatch => ({
		addLog : data => dispatch({type: 'ADD_LOG', data}),
	})
)(SocketListen);

