import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row} from 'react-bootstrap';
import ExerciseDetails from './ExerciseDetails';

class ExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfAllExercises: []
		};
	}

	componentDidMount() {
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
	}

	render() {
		const exerciseList = this.state.listOfAllExercises.map(exercise => {
			return <ExerciseDetails
				key={exercise._id}
				id={exercise._id}
				thumbImage={exercise.thumbImage}
				title={exercise.title}
				description={exercise.description}/>;
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