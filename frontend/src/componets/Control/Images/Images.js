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

const Images = (state) => {
	const data = state.store.data;
	const idProp = 'IMAGE ID';

	let rows;

	if (data.length) {
		rows = data.map(n => {
			return (
				<TableRow key={`img_${n[idProp]}`}>
					<TableRowColumn>Buttons</TableRowColumn>
					<TableRowColumn>{n[idProp]}</TableRowColumn>
					<TableRowColumn >{n.TAG}</TableRowColumn>
					<TableRowColumn >{n.REPOSITORY}</TableRowColumn>
					<TableRowColumn >{n.SIZE}</TableRowColumn>
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
				<TableHeader displaySelectAll={false}>
					<TableRow>
						<TableHeaderColumn>ACTION</TableHeaderColumn>
						<TableHeaderColumn>{idProp}</TableHeaderColumn>
						<TableHeaderColumn>TAG</TableHeaderColumn>
						<TableHeaderColumn>REPOSITORY</TableHeaderColumn>
						<TableHeaderColumn>SIZE</TableHeaderColumn>
						<TableHeaderColumn>CREATED</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{rows}
				</TableBody>
			</Table>
		</div>

	);
};

export default connect(
	state => ({
		store: state.images
	})
)(Images);
