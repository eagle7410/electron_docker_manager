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

	const data = state.store.data;

	let rows;

	if (data.length) {
		rows = data.map(n => {
			const id = n['CONTAINER ID'];

			return (
				<TableRow key={`cont_${id}`}>
					<TableRowColumn>
						<Actions row={n}/>
						<ButtonStatus row={n}/>
					</TableRowColumn>
					{PROPS_ORDER.map((prop,inx) => (<TableRowColumn key={`cont_cell_${inx}_${id}`}>{n[prop]}</TableRowColumn>))}
				</TableRow>
			);
		});
	} else {
		rows = (
			<TableRow key={'cont_empty'} >
				<TableRowColumn colSpan={PROPS_ORDER.length + 1}>You not has containers</TableRowColumn>
			</TableRow>
		);
	}

	return (
		<div>
			<Table>
				<TableHeader displaySelectAll={false}>
					<TableRow>
						<TableHeaderColumn colSpan={PROPS_ORDER.length + 1}>
							<ToolsBar/>
						</TableHeaderColumn>
					</TableRow>
					<TableRow>
						<TableHeaderColumn>ACTION</TableHeaderColumn>
						{PROPS_ORDER.map((prop, inx) => (<TableHeaderColumn key={`cont_head_${inx}`}>{prop}</TableHeaderColumn>))}
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>{rows}</TableBody>
			</Table>
			<DialogContainerToImage/>
			<DialogContainerLogs/>
			<DialogContainerBash/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.containers
	})
)(Contains);
