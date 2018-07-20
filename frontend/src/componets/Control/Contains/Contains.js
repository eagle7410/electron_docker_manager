import React from 'react';
import {connect} from 'react-redux';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeader,
	TableHeaderColumn,
} from 'material-ui/Table';
import ButtonStatus from './ButtonStatus';
import ButtonRename from './ButtonRename';

const Contains = (state) => {

	const data = state.store.data;

	let rows;

	if (data.length) {
		rows = data.map(n => {
			return (
				<TableRow key={`cont_${n['CONTAINER ID']}`}>
					<TableRowColumn>
						<ButtonStatus row={n}/>
						<ButtonRename row={n}/>
					</TableRowColumn>
					<TableRowColumn>{n['CONTAINER ID']}</TableRowColumn>
					<TableRowColumn >{n.STATUS}</TableRowColumn>
					<TableRowColumn >{n.PORTS}</TableRowColumn>
					<TableRowColumn >{n.NAMES}</TableRowColumn>
					<TableRowColumn >{n.IMAGE}</TableRowColumn>
					<TableRowColumn >{n.COMMAND}</TableRowColumn>
					<TableRowColumn >{n.CREATED}</TableRowColumn>
				</TableRow>
			);
		});
	} else {
		rows = (
			<TableRow key={'cont_empty'} >
				<TableRowColumn>You not has containers</TableRowColumn>
			</TableRow>
		);
	}

	return (
		<div>
			<Table>
				<TableHeader
					displaySelectAll={false}
				>
					<TableRow>
						<TableHeaderColumn>ACTION</TableHeaderColumn>
						<TableHeaderColumn>CONTAINER ID</TableHeaderColumn>
						<TableHeaderColumn >STATUS</TableHeaderColumn>
						<TableHeaderColumn >PORTS</TableHeaderColumn>
						<TableHeaderColumn >NAMES</TableHeaderColumn>
						<TableHeaderColumn >IMAGE</TableHeaderColumn>
						<TableHeaderColumn >COMMAND</TableHeaderColumn>
						<TableHeaderColumn >CREATED</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={false}
				>
					{rows}
				</TableBody>
			</Table>
		</div>

	);
};

export default connect(
	state => ({
		store: state.containers
	}),
	dispatch => ({})

)(Contains);
