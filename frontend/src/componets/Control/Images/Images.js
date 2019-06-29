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
import TextField from "material-ui/TextField/index";
import {PREFIX_IMAGES as PREFIX} from "../../../const/prefix";

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
	const {data, selected, wait} = state.store;
	const idProp = 'IMAGE ID';
	const isSelected = (index) => selected.indexOf(index) !== -1;
	let isShowCheck = true;
	let rows;

	if (data.length) {
		rows = data.map((row,inx) => {
			const id = row[idProp];

			return (
				<TableRow key={`img_${id}_${inx}`} selected={isSelected(inx)} >
					<TableRowColumn>
						{wait ? null : <Actions row={row}/>}
						{id}
					</TableRowColumn>
					{PROP_ORDER.map((prop, inx) => (
						<TableRowColumn key={`img_cell_${id}_${inx}`}>
							<TextField
								id={`img_cell_field_${id}_${inx}`}
								value={row[prop]}
								multiLine={true}
								underlineShow={false}
							/>
						</TableRowColumn>
					))}
				</TableRow>
			);
		});
	} else {
		isShowCheck = false;
		rows = (
			<TableRow key={'img_cont_empty'} >
				<TableRowColumn colSpan={COLUMN_COUNT}>You not has images</TableRowColumn>
			</TableRow>
		);
	}

	const onCellClick = (row, col) => {
		if (col !== -1 || wait) return;

		if (isSelected(row)) {
			state.selectedRows(selected.filter(s => s !== row));
			return;
		}

		state.selectedRows(selected.concat([row]));
	};

	return (
		<div key={'images_base'}>
			<Table  key={'images_table'} onCellClick={onCellClick} multiSelectable>
				<TableHeader displaySelectAll={true} adjustForCheckbox={false} enableSelectAll={false}>
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
				<TableBody deselectOnClickaway={false} displayRowCheckbox={isShowCheck}>
					{rows}
				</TableBody>
			</Table>
		</div>

	);
};

export default connect(
	state => ({
		store: state.images
	}),
	dispatch => ({
		selectedRows : (data) => dispatch({type : `${PREFIX}_SELECTED`, data}),
	})
)(Images);
