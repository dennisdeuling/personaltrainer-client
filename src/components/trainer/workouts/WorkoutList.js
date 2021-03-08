import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';
import {getExercises, getUserById} from '../../services/data-service';
import WorkoutDetails from './WorkoutDetails';

class WorkoutList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: '',
				workouts: ''
			},
			listOfAllWorkouts: [],
			listOfAllExercises: [],
			deleteWorkout: false
		};
	}

	componentDidMount() {
		const {_id: trainerId} = this.props.user;
		getUserById(trainerId)
			.then(workouts => {
				this.setState({
					user: {
						loggedIn: this.props.user,
						workouts: workouts.workouts
					}
				});
			});

		getExercises()
			.then(result => {
				this.setState({
					listOfAllExercises: result
				});
			});

		/*getWorkouts()
			.then(result => {
				this.setState({
					listOfAllWorkouts: result
				});
			});*/
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.deleteWorkout) {
			/*getWorkouts()
				.then(result => {
					this.setState({
						listOfAllWorkouts: result,
						deleteWorkout: false
					});
				});*/
		}
	}

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
		let workouts = this.state.user.workouts.workouts;
		if (workouts !== undefined) {
			workouts = workouts.map(workout => {
				return <WorkoutDetails
					key={workout._id}
					_id={workout._id}
					title={workout.title}
					description={workout.description}
					exerciseList={workout.exercises}
					deleteWorkout={this.deleteWorkout}
					listOfAllExercises={this.state.listOfAllExercises}/>;
			});
		}

		return (
			<div>
				<h1>Workouts</h1>
				<Container>
					<Row>
						{workouts}
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