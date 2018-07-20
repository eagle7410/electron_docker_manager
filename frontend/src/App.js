// Libs
import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
//Const
import appRoutes from './const/app-routes'
// Components
import DataLoader from './componets/tools/DataLoader'
import NeedDocker from './componets/NeedDocker/NeedDocker'
import Password from './componets/Password/Password'
import Control from './componets/Control/Control'
import DockerLoad from './componets/DockerLoad/DockerLoad'

const App = () => (
	<div className='App'>
		<h1>Hekkoy</h1>
		{/*<header className='App-header'>*/}
			{/*<img src='./img/SQLMath.png' className='App-logo' alt='logo'/>*/}
			{/*<h1 className='App-title'>Welcome to database manager</h1>*/}
		{/*</header>*/}
		{/*<div className='App-body container'>*/}
			{/*<div className="row">*/}
				{/*<Switch>*/}
					{/*<Route path={appRoutes.needDocker} component={NeedDocker} />*/}
					{/*<Route path={appRoutes.pass} component={Password} />*/}
					{/*<Route path={appRoutes.control} component={Control} />*/}
					{/*<Route path={appRoutes.dockerload} component={DockerLoad} />*/}
					{/*<Route path='/' component={DataLoader}/>*/}
				{/*</Switch>*/}
			{/*</div>*/}

		{/*</div>*/}
	</div>
);

export default App;
