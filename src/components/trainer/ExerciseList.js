import React, {Component} from 'react';
import axios from 'axios';
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
		console.log(this.state.listOfAllExercises);

		const exerciseList = this.state.listOfAllExercises.map(exercise => {
			return <ExerciseDetails
				key={exercise._id}
				title={exercise.title}
				description={exercise.description}
				thumbImage={exercise.thumbImage}/>;
		});
		return (
			<div>
				<h1>Exercises</h1>
				{exerciseList}
			</div>
		);
	}
}

export default ExerciseList;