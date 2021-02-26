import React, {Component} from 'react';
import {getExercises} from '../functions/getData';
import {Card, ListGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

class WorkoutExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exerciseList: this.props.exerciseList,
			listOfAllExercises: [],
			showForm: false
		};
	}

	componentDidMount() {
		getExercises().then(result => {
			this.setState({
				listOfAllExercises: result
			});
		});
	}

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		const exerciseList = this.state.exerciseList.map(exercise => {
			return <ListGroup.Item>{exercise.title}</ListGroup.Item>;
		});

		return (
			<React.Fragment>
				<Card.Header>Exercises</Card.Header>
				<ListGroup variant="flush">
					{exerciseList}
					<ListGroup.Item>
						<FontAwesomeIcon
							icon={faEdit}
							onClick={() => this.setState({showForm: true})}/>
						<FontAwesomeIcon
							icon={faTrash}
							onClick={() => this.deleteWorkout()}/>
					</ListGroup.Item>
				</ListGroup>

			</React.Fragment>
		);
	}
}

export default WorkoutExerciseList;