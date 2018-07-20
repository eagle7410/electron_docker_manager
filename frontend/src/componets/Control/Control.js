import React from 'react';
import Paper from 'material-ui/Paper'
import IconStatuses from 'material-ui/svg-icons/action/settings-input-component';
import IconOther from 'material-ui/svg-icons/action/build';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import ButtonStatus from './ButtonStatus'

const Control = (state) => {

	return (
		<Paper zDepth={2}>
			<Tabs>
				<Tab icon={<IconStatuses/>} label="Services" style={{height: '100px'}}>
					<ButtonStatus
						service="mongo"
						label="mongo"
						imgSrc="img/mongo.png"
					/>
					<ButtonStatus
						service="mysql"
						label="mysql"
						imgSrc="img/mysql.png"
					/>
					<ButtonStatus
						service="myadmin"
						label="phpmyadmin"
						imgSrc="img/myadmin.png"
					/>
					<ButtonStatus
						service="redis"
						label="redis"
						imgSrc="img/redis.png"
					/>
					<ButtonStatus
						service="redis_manager"
						label="redis_manager"
						imgSrc="img/redis_manager.png"
					/>
					<ButtonStatus
						service="postgres"
						label="postgres"
						imgSrc="img/postgres.png"
					/>
					<ButtonStatus
						service="postgis"
						label="postgis"
						imgSrc="img/postgis.png"
					/>
					<ButtonStatus
						service="pgadmin"
						label="pgadmin4"
						imgSrc="img/pgadmin.png"
					/>
				</Tab>
				<Tab icon={<IconOther/>} label="other">
					<h1>Be doit :)</h1>
				</Tab>

			</Tabs>

		</Paper>
	);
};

export default connect(
	state => ({
		store: state.pass
	}),
	dispatch => ({
		setErr: (err) => dispatch({type: 'PASS_ERROR', err}),
		setPass: (pass) => dispatch({type: 'PASS_SET', pass}),
	})
)(Control);
