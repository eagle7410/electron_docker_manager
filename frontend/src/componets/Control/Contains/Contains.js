import React from 'react';
import {connect} from "react-redux";
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
	TableHeader,
	TableHeaderColumn,
} from 'material-ui/Table';
import ButtonStatus from './ButtonStatus';
import ToolsBar from './ToolsBar';
import Actions from './Actions';
import DialogContainerToImage from './DialogContainerToImage';
import DialogContainerLogs from './DialogContainerLogs';
import DialogContainerBash from './DialogContainerBash';
import ContainerStats from './ContainerStats'
import ContainerLimits from './ContainerLimits'
import TextField from "material-ui/TextField/index";

import {
	PREFIX_CONTAINER as PREFIX,
} from '../../../const/prefix'

const PROPS_ORDER = [
	'NAMES',
	'CONTAINER ID',
	'LABEL_PORTS',
	'PORTS',
	'STATUS',
	'IMAGE',
	'COMMENT',
	'COMMAND',
	'CREATED',
];

const Contains = (state) => {

	const {data, selected, wait} = state.store;

	const isSelected = (index) => selected.indexOf(index) !== -1;

	let rows;
	let isShowCheck = true;
	if (data.length) {
		rows = data.map((n, inx) => {
			const id = n['CONTAINER ID'];

			return (
				<TableRow key={`cont_${id}_${inx}`} selected={isSelected(inx)} >
					<TableRowColumn >
						{wait ? null : <Actions row={n}/>}

						<ButtonStatus row={n}/>
					</TableRowColumn>
					{PROPS_ORDER.map((prop,inx) => (
						<TableRowColumn key={`cont_cell_${inx}_${id}`}>
							<TextField
								id={`cont_cell_field_${id}_${inx}`}
								value={n[prop]}
								multiLine={true}
								underlineShow={false}
								/>
						</TableRowColumn>))}
				</TableRow>
			);
		});
	} else {
		isShowCheck =false;
		rows = (
			<TableRow key={'cont_empty'} >
				<TableRowColumn colSpan={PROPS_ORDER.length + 1}>You not has containers</TableRowColumn>
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
		<div key={'contr'}>
			<Table key={'table_containers'} onCellClick={onCellClick} multiSelectable>
				<TableHeader displaySelectAll={true} adjustForCheckbox={false} enableSelectAll={false}>
					<TableRow >
						<TableHeaderColumn colSpan={PROPS_ORDER.length + 1}>
							<ToolsBar/>
						</TableHeaderColumn>
					</TableRow>
					<TableRow selectable={false}>
						<TableHeaderColumn>ACTION</TableHeaderColumn>
						{PROPS_ORDER.map((prop, inx) => (<TableHeaderColumn key={`cont_head_${inx}`}>{prop}</TableHeaderColumn>))}
					</TableRow>
				</TableHeader>
				<TableBody deselectOnClickaway={false} displayRowCheckbox={isShowCheck}>{rows}</TableBody>
			</Table>
			<DialogContainerToImage/>
			<DialogContainerLogs/>
			<DialogContainerBash/>
			<ContainerStats/>
			<ContainerLimits/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.containers
	}),
	dispatch => ({
		selectedRows : (data) => dispatch({type : `${PREFIX}_SELECTED`, data}),
	})

)(Contains);
