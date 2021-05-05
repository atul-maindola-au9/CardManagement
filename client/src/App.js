import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './views/LandingPage';
import Edit from './views/Edit';

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route path='/card/raj-patel' component={LandingPage} />
				<Route path='/edit' component={Edit} />
			</Switch>
		</>
	);
}

export default App;
