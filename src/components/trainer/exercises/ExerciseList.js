import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row} from 'react-bootstrap';
import ExerciseDetails from './ExerciseDetails';
import {getUserById} from '../../services/data-service';

class ExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: '',
				exercises: ''
			},
			listOfAllExercises: [],
			deleteExercise: false
		};
	}

	componentDidMount() {
		const {_id: trainerId} = this.props.user;
		getUserById(trainerId)
			.then(exercises => {
				console.log(exercises);
				this.setState({
					user: {
						loggedIn: this.props.user,
						exercises: exercises.exercises
					}
				});
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.deleteExercise) {
			this.getExercises();
			this.setState({
				deleteExercise: false
			});
		}
	}

	getExercises = () => {
		axios.get(`${process.env.REACT_APP_API_URL}/exercise`, {
			withCredentials: true
		})
			.then(responseAPI => {
				this.setState({
					listOfAllExercises: responseAPI.data
				});
			}, error => {
				console.error(error);
			});
	};

	deleteExercise = id => {
		let allExercises = this.state.listOfAllExercises.map(exercise => {
			return exercise;
		});
		const index = allExercises.findIndex(exercise => exercise._id === id);
		allExercises = allExercises.splice(index, 1);
		this.setState({
			listOfAllExercises: allExercises,
			deleteExercise: true
		});
		this.props.history.push('/exercises');
	};

	render() {
		let exerciseList = this.state.user.exercises;

		if (exerciseList.length > 0) {
			exerciseList = exerciseList.map(exercise => {
				return <ExerciseDetails
					key={exercise._id}
					_id={exercise._id}
					thumbImage={exercise.thumbImage}
					title={exercise.title}
					description={exercise.description}
					deleteExercise={this.deleteExercise}/>;
			});
		}
		return (
			<div>
				<h1>Exercises</h1>
				<Container>
					<Row>
						{exerciseList}
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

export default ExerciseList;