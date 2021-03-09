import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import ExerciseList from './components/trainer/exercises/ExerciseList';
import AddExercise from './components/trainer/exercises/AddExercise';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/clients/Dashboard';
import Profile from './components/trainer/profile/Profile';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/protected-route';
import AuthService from './components/services/auth-service';
import ListOfTrainers from './components/clients/ListOfTrainers';
import TrainerWorkoutList from './components/trainer/workouts/WorkoutList';
import ClientWorkoutList from './components/clients/WorkoutList';
import AddWorkout from './components/trainer/workouts/AddWorkout';

class App extends Component {
	service = new AuthService();

	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: null
		};
	}

	componentDidMount() {
		this.service.isLoggedIn()
			.then(userObj => {
				this.setState({
					loggedInUser: userObj
				});
			}, error => {
				this.setState({
					loggedInUser: null
				});
			});
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

					{/*Routes for trainers*/}
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/profile"
									component={Profile}/>
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
									component={TrainerWorkoutList}/>
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/workouts/add"
									component={AddWorkout}/>

					{/*Routes for clients*/}
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/dashboard"
									component={Dashboard}/>
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/trainer"
									component={ListOfTrainers}/>
					<ProtectedRoute exact
									user={this.state.loggedInUser}
									path="/my-workouts"
									component={ClientWorkoutList}/>

					{/*Routes for login and auth*/}
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
