import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import ExerciseList from './components/trainer/exercises/ExerciseList';
import AddExercise from './components/trainer/exercises/AddExercise';
import WorkoutList from './components/trainer/workouts/WorkoutList';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/clients/Dashboard';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null
		};
	}

	getTheUser = userObj => {
		this.setState({
			loggedInUser: userObj
		});
	};

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact
						   path="/exercises"
						   render={props => <ExerciseList {...props} />}/>
					<Route exact path="/exercises/add">
						<AddExercise/>
					</Route>
					<Route exact
						   path="/workouts"
						   render={props => <WorkoutList {...props} />}/>


					<Route exact
						   path="/dashboard"
						   render={props => <Dashboard {...props} />}/>

					<Route exact
						   path="/login"
						   render={props => <Login {...props} getUser={this.getTheUser}/>}/>

					<Route exact
						   path="/signup"
						   render={props => <Signup {...props} getUser={this.getTheUser}/>}/>
				</Switch>
			</div>
		);
	}
}

export default App;
