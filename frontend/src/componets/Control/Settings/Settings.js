import React from 'react';
import {connect} from 'react-redux';
import {
	saveFilePath,
	saveAttach,
	openFilePath,
	loadAttach,
} from '../../../api/api';
import {
	PREFIX_SETTINGS as PREFIX
} from '../../../const/prefix';

import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,

} from 'material-ui/Table';
import IconSave from "material-ui/svg-icons/content/save";
import IconLoad from "material-ui/svg-icons/action/get-app";
import RaisedButton from "material-ui/RaisedButton";

const style = {marginLeft : 15, fontSize: '1.2em'};
const ACTION_LABEl = {
	saveAttach : 'Save attach data',
	loadAttach : 'Load attach data'
};

const Settings = (state) => {
	const store = state.store;

	const classLoad = 'wait-update-status';

	const handlerLoad = async () => {
		state.runDoit(ACTION_LABEl.loadAttach);

		try {
			const data = await openFilePath();
			await loadAttach(data);
		} catch (e) {
			alert(typeof e === 'string' ? e : e.stack);
		} finally {
			state.stopDoit();
		}
	};

	const handlerSave = async () => {
		state.runDoit(ACTION_LABEl.saveAttach);

		try {
			const data = await saveFilePath(false);
			await saveAttach(data);
		} catch (e) {
			alert(typeof e === 'string' ? e : e.stack);
		} finally {
			state.stopDoit();
		}
	};

	return (
		<div key={'settings'}>
			<Table>
				<TableBody displayRowCheckbox={false}>
					<TableRow >
						<TableRowColumn>
							<RaisedButton
								className={store.action === ACTION_LABEl.saveAttach ? classLoad : ''}
								primary={true}
								disabled={Boolean(store.action)}
								icon={<IconSave/>}
								onClick={() => handlerSave()}
							/>
							<span style={style}>{ACTION_LABEl.saveAttach}</span>
						</TableRowColumn>
					</TableRow>
					<TableRow >
						<TableRowColumn>
							<RaisedButton
								className={store.action === ACTION_LABEl.loadAttach ? classLoad : ''}
								primary={true}
								disabled={Boolean(store.action)}
								icon={<IconLoad/>}
								onClick={() => handlerLoad()}
							/>
							<span style={style}>{ACTION_LABEl.loadAttach}</span>

						</TableRowColumn>
					</TableRow>
				</TableBody>
			</Table>
		</div>

	);
};

export default connect(
	state => ({
		store : state.settings
	}),
	dispatch => ({
		runDoit : (data) => dispatch({type : `${PREFIX}_RUN_DOIT`, data}),
		stopDoit : () => dispatch({type : `${PREFIX}_STOP_DOIT`}),
	})
)(Settings);
