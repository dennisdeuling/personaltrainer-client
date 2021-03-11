import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';
import {uuid} from 'uuidv4';
import {deleteWorkout, getUserById} from '../../services/data-service';
import WorkoutDetails from './WorkoutDetails';

class WorkoutList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: this.props.user,
				workouts: '',
				exercises: ''
			},
			deletedWorkout: false
		};
	}

	componentDidMount() {
		const {_id: trainerId} = this.props.user;
		getUserById(trainerId)
			.then(result => {
				this.setState({
					user: {
						loggedIn: this.props.user,
						workouts: result.workouts,
						exercises: result.exercises
					}
				});
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.deletedWorkout) {
			const {_id: trainerId} = this.state.user.loggedIn;
			getUserById(trainerId)
				.then(result => {
					this.setState({
						user: {
							loggedIn: this.props.user,
							workouts: result.workouts,
							exercises: result.exercises
						},
						deletedWorkout: false
					});
				});

		}
	}

	deleteWorkout = id => {
		console.log(id);
		console.log(this.state.deletedWorkout);
		deleteWorkout(id)
			.then(response => {
				console.log(response);
				this.setState({
					deletedWorkout: true
				});
			});
	};

	render() {
		let workouts = this.state.user.workouts;

		if (workouts.length > 0) {
			workouts = workouts.map(workout => {
				return <WorkoutDetails
					key={uuid()}
					_id={workout._id}
					title={workout.title}
					description={workout.description}
					exerciseList={workout.exercises}
					deleteWorkout={this.deleteWorkout}
					listOfAllExercises={this.state.user.exercises}
					userGroup={this.state.user.loggedIn.userGroup}
					userId={this.state.user.loggedIn._id}/>;
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