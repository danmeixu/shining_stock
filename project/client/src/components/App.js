import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Homepage from './Homepage';
import Recommendations from './Recommendations';
import Trending from './Trending';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Homepage />
							)}
						/>
						<Route
							exact
							path="/homepage"
							render={() => (
								<Homepage />
							)}
						/>
						<Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/trending"
							render={() => (
								<Trending />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
