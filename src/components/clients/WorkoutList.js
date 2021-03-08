import React, {Component} from 'react';
import {getUserById} from '../services/data-service';
import WorkoutDetails from '../trainer/workouts/WorkoutDetails';

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
				console.log(user);
				user.trainer.map(trainerId => {
					getUserById(trainerId)
						.then(workouts => {
							this.setState({
								workouts: [...this.state.workouts, ...workouts]
							});
						});
				});
			}, error => {
				console.log(error);
			});
	}

	render() {
		console.log(this.state.workouts);
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
				{workoutList}
			</div>
		);
	}
}

export default WorkoutList;