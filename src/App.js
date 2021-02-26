import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import ExerciseList from './components/trainer/exercises/ExerciseList';
import AddExercise from './components/trainer/exercises/AddExercise';
import WorkoutList from './components/trainer/workouts/WorkoutList';
import WorkoutExerciseList from './components/trainer/workouts/WorkoutExerciseList';

function App() {
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
					   path="/workout-exercise-list"
					   render={props => <WorkoutExerciseList {...props} />}/>
			</Switch>
		</div>
	);
}

export default App;
