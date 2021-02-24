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
		let allWorkouts = this.state.listOfAllWorkouts.map(exercise => {
			return exercise;
		});
		const index = allWorkouts.findIndex(exercise => exercise._id === id);
		allWorkouts = allWorkouts.splice(index, 1);
		this.setState({
			listOfAllExercises: allWorkouts,
			deleteWorkout: true
		});
		this.props.history.push('/workouts');
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