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

const PROP_ORDER = [
	'IMAGE ID',
	'TAG',
	'SIZE',
	'REPOSITORY',
	'CREATED',
];

const Images = (state) => {
	const data = state.store.data;
	const idProp = 'IMAGE ID';

	let rows;

	if (data.length) {
		rows = data.map(n => {
			const id = n[idProp];

			return (
				<TableRow key={`img_${id}`}>
					<TableRowColumn>ACTION FOR {`img_${id}`}</TableRowColumn>
					{PROP_ORDER.map((prop, inx) => (<TableRowColumn key={`img_cell_${id}_${inx}`}>{n[prop]}</TableRowColumn>))}
				</TableRow>
			);
		});
	} else {
		rows = (
			<TableRow key={'img_cont_empty'} >
				<TableRowColumn>You not has images</TableRowColumn>
			</TableRow>
		);
	}

	return (
		<div>
			<Table>
				<TableHeader displaySelectAll={false}>
					<TableRow>
						<TableHeaderColumn>ACTIONS</TableHeaderColumn>
						{PROP_ORDER.map((prop, inx) => (<TableHeaderColumn key={`cont_head_${inx}`}>{prop}</TableHeaderColumn>))}
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
