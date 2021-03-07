import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import ExerciseList from './components/trainer/exercises/ExerciseList';
import AddExercise from './components/trainer/exercises/AddExercise';
import WorkoutList from './components/trainer/workouts/WorkoutList';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/clients/Dashboard';
import Profile from './components/trainer/profile/Profile';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/protected-route';

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
				{this.state.loggedInUser !== null &&
				<Navigation user={this.state.loggedInUser} getUser={this.getTheUser}/>}
				<Switch>
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/exercises"
									component={ExerciseList}/>

					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/exercises/add"
									component={AddExercise}/>
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/workouts"
									component={WorkoutList}/>

					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/dashboard"
									component={Dashboard}/>

					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/profile"
									component={Profile}/>
					{/*	<Route exact
						   path="/exercises"
						   render={props => <ExerciseList {...props} />}/>
					<Route exact
						   path="/exercises/add"
						   render={props => <AddExercise {...props} />}/>

					<Route exact
						   path="/workouts"
						   render={props => <WorkoutList {...props} />}/>

					<Route exact
						   path="/dashboard"
						   render={props => <Dashboard {...props} />}/>

					<Route exact
						   path="/profile"
						   render={props => <Profile {...props} />}/>*/}

					<Route exact
						   path="/">
						<Redirect to="/login"/>
					</Route>

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
