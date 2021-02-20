import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import ExerciseList from './components/trainer/ExerciseList';
import AddExercise from './components/trainer/AddExercise';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/exercises">
					<ExerciseList/>
				</Route>
				<Route exact path="/exercises/add">
					<AddExercise/>
				</Route>
			</Switch>
		</div>
	);
}

export default App;
