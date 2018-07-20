// Libs
import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
//Const
import appRoutes from './const/app-routes'
// Components
import DataLoader from './componets/tools/DataLoader'
import NeedDocker from './componets/NeedDocker/NeedDocker'
import Contains from './componets/Contains/Contains'

const App = () => (
	<div className='App'>

		<header className='App-header'>
			<img src='./img/Docker.png' className='App-logo' alt='logo'/>
			<h1 className='App-title'>Welcome to docker manager</h1>
		</header>
		<div className='App-body container'>
			<div className="row">
				<Switch>
					<Route path={appRoutes.needDocker} component={NeedDocker} />
					<Route path={appRoutes.contains} component={Contains} />
					<Route path='/' component={DataLoader}/>
				</Switch>
			</div>

		</div>
	</div>
);

export default App;
