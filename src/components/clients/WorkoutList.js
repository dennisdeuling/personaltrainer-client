import React, {Component} from 'react';
import {getUserById} from '../services/data-service';
import {Container, Row} from 'react-bootstrap';

import WorkoutDetails from './WorkoutDetails';

class WorkoutList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: '',
				userDB: ''
			},
			workouts: []
		};
	}

	componentDidMount() {
		const {_id: userId} = this.props.user;
		getUserById(userId)
			.then(user => {
				this.setState({
					user: {
						loggedIn: this.props.user,
						userDB: user
					}
				});
				user.trainer.forEach(trainerId => {
					getUserById(trainerId)
						.then(response => {
							this.setState({
								workouts: [...this.state.workouts, ...response.workouts]
							});
						});
				});
			});
	}

	render() {
		const workoutList = this.state.workouts.map(workout => {
			return <WorkoutDetails
				key={workout._id}
				_id={workout._id}
				title={workout.title}
				description={workout.description}
				exerciseList={workout.exercises}/>;
		});
		return (
			<div>
				<h1>Workouts</h1>
				<Container>
					<Row>
						{workoutList}
					</Row>
				</Container>
			</div>
		);
	}
}

export default WorkoutList;