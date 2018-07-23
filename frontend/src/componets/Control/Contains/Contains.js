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

const PROPS_ORDER = [
	'NAMES',
	'CONTAINER ID',
	'PORTS',
	'STATUS',
	'IMAGE',
	'COMMAND',
	'CREATED',
];

const Contains = (state) => {

	const data = state.store.data;

	let rows;

	if (data.length) {
		rows = data.map(n => {
			const id = n['CONTAINER ID'];

			return (
				<TableRow key={`cont_${id}`}>
					<TableRowColumn>
						<ButtonStatus row={n}/>
						<ButtonRename row={n}/>
					</TableRowColumn>
					{PROPS_ORDER.map((prop,inx) => (<TableRowColumn key={`cont_cell_${inx}_${id}`}>{n[prop]}</TableRowColumn>))}
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
						{PROPS_ORDER.map((prop, inx) => (<TableHeaderColumn key={`cont_head_${inx}`}>{prop}</TableHeaderColumn>))}
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
