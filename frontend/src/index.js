import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ListeningRouter} from './componets/tools/ListeningRouter';
import {reducer} from './reducers';
import SocketListen from './componets/tools/SocketListen'
import Logs from './componets/tools/Logs'
const browserHistory = createHistory();
const middleware = routerMiddleware(browserHistory);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware)));

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<div>
				<ListeningRouter>
					<MuiThemeProvider>
						<App/>
					</MuiThemeProvider>
				</ListeningRouter>
				<SocketListen><Logs/></SocketListen>
			</div>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);


