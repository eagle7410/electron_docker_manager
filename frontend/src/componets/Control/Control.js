import React from 'react';
import Paper from 'material-ui/Paper'
import IconContainers from 'material-ui/svg-icons/image/filter-none';
import IconImages from 'material-ui/svg-icons/image/adjust';
import {Tabs, Tab} from 'material-ui/Tabs';
import Contains from './Contains/Contains';
import Images from './Images/Images';
import DialogInput from '../tools/DialogInput'

const Control = () => {

	return (
		<div>
			<Paper zDepth={2}>
				<Tabs>
					<Tab icon={<IconContainers/>} label="Containers" style={{height: '100px'}}>
						<Contains/>
					</Tab>
					<Tab icon={<IconImages/>} label="Images">
						<Images/>
					</Tab>
				</Tabs>
			</Paper>
			<DialogInput />
		</div>
	);
};

export default Control;
