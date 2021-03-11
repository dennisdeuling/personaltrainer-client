import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

class ExerciseDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			image: this.props.image,
			showForm: false
		};
	}

	editExercise = event => {
		event.preventDefault();
		const {_id, title, description} = this.state;

		axios.put(`${process.env.REACT_APP_API_URL}/exercise/${_id}`, {
			title,
			description
		}, {withCredentials: true})
			.then(() => {
				this.setState({
					showForm: false
				});
			}, error => {
				console.error(error);
			});
	};

	deleteExercise = () => {
		const {_id} = this.state;

		//TODO: Make a data service from it
		axios.delete(`${process.env.REACT_APP_API_URL}/exercise/${_id}`, {
			withCredentials: true
		})
			.then(() => {
				this.props.deleteExercise(_id);
			}, error => {
				console.error(error);
			});
	};

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<React.Fragment>
				{this.state.showForm ?
					<Form onSubmit={this.editExercise}>
						<Card style={{width: '18rem'}}>
							<Card.Img variant="top" src={this.state.image}/>
							<Card.Body>
								<Card.Title>
									<Form.Group>
										<Form.Label>Title:</Form.Label>
										<Form.Control as="textarea"
													  rows={1}
													  name="title"
													  value={this.state.title}
													  onChange={event => this.handleChange(event)}/>
									</Form.Group>
								</Card.Title>
								<Card.Text>
									<Form.Group>
										<Form.Label>Description:</Form.Label>
										<Form.Control as="textarea"
													  rows={3}
													  name="description"
													  value={this.state.description}
													  onChange={event => this.handleChange(event)}/>
									</Form.Group>
								</Card.Text>
								<Button variant="primary"
										type="submit"
										size="lg"
										block>
									Submit
								</Button>
							</Card.Body>
						</Card>
					</Form>
					:
					<Card style={{width: '18rem'}}>
						<Card.Img variant="top" src={this.state.image}/>
						<Card.Body>
							<Card.Title>{this.state.title}</Card.Title>
							<Card.Text>{this.state.description}</Card.Text>
							<FontAwesomeIcon
								icon={faEdit}
								onClick={() => this.setState({showForm: true})}/>
							<FontAwesomeIcon
								icon={faTrash}
								onClick={() => this.props.deleteExercise(this.state._id)}/>
						</Card.Body>
					</Card>
				}
			</React.Fragment>
		);
	}
}

export default ExerciseDetails;