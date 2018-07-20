import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {renameContainer, toggleContainer} from '../../../api/api';
import {connect} from "react-redux";

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class ButtonRename extends Component {
	state = {
		open: false,
		newname : ''
	};

	handleSubmit = () => {
		const call = async () => {

			alert('NN');
			try {
				this.props.wait(this.props.row.id);
				this.props.change(await renameContainer(this.props.row.id, this.state.newname));

			} catch (e) {
				alert(e.message ? e.message : e);
				this.props.handleClose();
			}
		};
		// TODO: Back bad
		call();
	};

	handleOpen = () => {
		this.setState({open: true, newname: ''});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	handleChangeNewname = (event, string) => {
		this.setState({open: true, newname : string});
	};

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleSubmit}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				disabled={!this.state.newname.length}
				onClick={this.handleClose}
			/>,
		];

		return (
			<span >
				<RaisedButton label="Rename" onClick={this.handleOpen} />
				<Dialog
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<TextField
						value={this.state.newname}
						hintText="Enter new name"
						onChange={this.handleChangeNewname}
					/>
				</Dialog>
			</span>
		);
	}
};

export default connect(
	state => ({
		store: state.containers
	}),
	dispatch => ({
		wait   : id   => dispatch({type: 'CONTAINER_WAIT_CHANGE_STATUS', data: id}),
		change : data => dispatch({type: 'CONTAINER_CHANGE', data})
	})
)(ButtonRename);
