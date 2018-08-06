import React from 'react';
import {connect} from 'react-redux';

import ToolsBar from './ToolsBar'
import Actions from './Actions'
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeader,
	TableHeaderColumn,

} from 'material-ui/Table';

const PROP_ORDER = [
	'REPOSITORY',
	'TAG',
	'LABEL_PORTS',
	'COMMENT',
	'SIZE',
	'CREATED',
];

const COLUMN_COUNT = PROP_ORDER.length + 1;

const Images = (state) => {
	const data = state.store.data;
	const idProp = 'IMAGE ID';

	let rows;

	if (data.length) {
		rows = data.map(row => {
			const id = row[idProp];

			return (
				<TableRow key={`img_${id}`}>
					<TableRowColumn><Actions row={row}/> {id}</TableRowColumn>
					{PROP_ORDER.map((prop, inx) => (<TableRowColumn key={`img_cell_${id}_${inx}`}>{row[prop]}</TableRowColumn>))}
				</TableRow>
			);
		});
	} else {
		rows = (
			<TableRow key={'img_cont_empty'} >
				<TableRowColumn colSpan={COLUMN_COUNT}>You not has images</TableRowColumn>
			</TableRow>
		);
	}

	return (
		<div>
			<Table>
				<TableHeader displaySelectAll={false}>
					<TableRow>
						<TableHeaderColumn colSpan={COLUMN_COUNT}>
							<ToolsBar/>
						</TableHeaderColumn>
					</TableRow>
					<TableRow>
						<TableHeaderColumn>{idProp}</TableHeaderColumn>
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
