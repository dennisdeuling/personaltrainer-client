import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form} from 'react-bootstrap';
import {createExercise, userModelPushArray} from '../../services/data-service';

class AddExercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: this.props.user
			},
			exercise: {
				title: '',
				description: '',
				image: ''
			},
			toggle: false
		};
	}

	handleFileUpload = event => {
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);

		//TODO: Make a data service from it
		axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
			.then(response => {
				this.setState({
					...this.state.user,
					exercise: {
						...this.state.exercise,
						image: response.data.imageUrl
					},
					toggle: true
				});
				console.log(this.state.exercise);
			}, error => {
				console.error(error);
			});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		const {title, description, image} = this.state.exercise;

		createExercise(title, description, image)
			.then(result => {
				const model = 'exercises';
				const {_id: dataId} = result;
				const {_id: userId} = this.state.user.loggedIn;

				userModelPushArray(userId, model, dataId)
					.then(() => {
						this.setState({
							...this.state.user,
							exercise: {
								title: '',
								description: '',
								image: ''
							},
							toggle: false
						});
					});
				this.props.history.push('/exercises');
			});
	};

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({
			exercise: {
				...this.state.exercise,
				[name]: value
			}
		});
	};


	render() {
		return (
			<React.Fragment>
				<Form onSubmit={this.handleFormSubmit}>
					<Card style={{width: '18rem'}}>
						<Card.Img variant="top" src={this.state.exercise.image}/>
						<Card.Body>
							{!this.state.toggle &&
							<Form.File
								id="thumbImage"
								label={'Upload an image file'}
								data-browse="Pick the image"
								custom
								onChange={event => this.handleFileUpload(event)}/>}
							<Card.Title>
								<Form.Group>
									<Form.Label>Title:</Form.Label>
									<Form.Control as="textarea"
												  rows={1}
												  name="title"
												  value={this.state.exercise.title}
												  onChange={event => this.handleChange(event)}/>
								</Form.Group>
							</Card.Title>
							<Card.Text>
								<Form.Group>
									<Form.Label>Description:</Form.Label>
									<Form.Control as="textarea"
												  rows={3}
												  name="description"
												  value={this.state.exercise.description}
												  onChange={event => this.handleChange(event)}/>
								</Form.Group>
							</Card.Text>
							{this.state.toggle &&
							<Button variant="primary"
									type="submit"
									size="lg"
									block>
								Submit
							</Button>}
						</Card.Body>
					</Card>
				</Form>
			</React.Fragment>
		);
	}
}

export default AddExercise;