import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row} from 'react-bootstrap';
import WorkoutDetails from './WorkoutDetails';

class WorkoutList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfAllWorkouts: [],
			deleteWorkout: false
		};
	}

	componentDidMount() {
		this.getWorkout();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.deleteWorkout) {
			this.getWorkout();
			this.setState({
				deleteWorkout: false
			});
		}
	}

	getWorkout = () => {
		axios.get('http://localhost:5000/api/workout', {
			withCredentials: true
		})
			.then(responseAPI => {
				this.setState({
					listOfAllWorkouts: responseAPI.data
				});
			}, error => {
				console.error(error);
			});
	};

	deleteWorkout = id => {
		/*let allExercises = this.state.listOfAllExercises.map(exercise => {
			return exercise;
		});
		const index = allExercises.findIndex(exercise => exercise._id === id);
		allExercises = allExercises.splice(index, 1);
		this.setState({
			listOfAllExercises: allExercises,
			deleteWorkout: true
		});
		this.props.history.push('/exercises');*/
	};

	render() {
		console.log(this.state.listOfAllWorkouts);
		const workoutList = this.state.listOfAllWorkouts.map(workout => {
			return <WorkoutDetails
				key={workout._id}
				_id={workout._id}
				title={workout.title}
				description={workout.description}
				exercises={workout.exercises}
				deleteWorkout={this.deleteWorkout}/>;
		});
		return (
			<div>
				<h1>Workouts</h1>
				<Container>
					<Row>
						{workoutList}
						{/*<Button variant="primary"
								type="submit"
								size="lg"
								block>
							Submit
						</Button>*/}
					</Row>
				</Container>
			</div>
		);
	}
}

export default WorkoutList;