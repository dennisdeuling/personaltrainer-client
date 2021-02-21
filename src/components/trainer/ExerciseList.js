import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row} from 'react-bootstrap';
import ExerciseDetails from './ExerciseDetails';

class ExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfAllExercises: [],
			deleteExercise: false
		};
	}

	componentDidMount() {
		this.getExercises();
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
		axios.get('http://localhost:5000/api/exercise', {
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
		const exerciseList = this.state.listOfAllExercises.map(exercise => {
			return <ExerciseDetails
				key={exercise._id}
				_id={exercise._id}
				thumbImage={exercise.thumbImage}
				title={exercise.title}
				description={exercise.description}
				deleteExercise={this.deleteExercise}/>;
		});
		return (
			<div>
				<h1>Exercises</h1>
				<Container>
					<Row>
						{exerciseList}
					</Row>
				</Container>
			</div>
		);
	}
}

export default ExerciseList;