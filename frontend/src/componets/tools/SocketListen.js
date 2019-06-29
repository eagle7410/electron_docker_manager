// eslint-disable-next-line
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SocketClient from "../../utils/SocketClient";
import {
	PREFIX_CONTAINER_BASH
} from '../../const/prefix'

const socketClient = new SocketClient();
class SocketListen extends Component {

	componentDidMount() {
		socketClient.on('out-add', this.props.addOut);
	}

	render () {
		return '';
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		addOut : data => dispatch({type: `${PREFIX_CONTAINER_BASH}_ADD_OUT`, data}),
	})
)(SocketListen);

