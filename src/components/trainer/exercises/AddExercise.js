import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form} from 'react-bootstrap';
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
				thumbImage: ''
			}
		};
	}

	handleFileUpload = event => {
		const uploadData = new FormData();
		uploadData.append('thumbImageUrl', event.target.files[0]);
		axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
			.then(response => {
				console.log(`Response from API: ${response}`);
				this.setState({
					exercise: {
						thumbImage: response.data.thumbImageUrl
					}
				});
			}, error => {
				console.error(error);
			});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		const {title, description, thumbImage} = this.state.exercise;
		console.log(this.state.exercise);

		createExercise(title, description, thumbImage)
			.then(result => {
				const model = 'exercises';
				const {_id: dataId} = result;
				const {_id: userId} = this.state.user.loggedIn;

				userModelPushArray(userId, model, dataId)
					.then(result => {
						console.log(result);
					});
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
		console.log();
		return (
			<div>
				<Form onSubmit={this.handleFormSubmit}>
					<Form.Group>
						<Form.Label>Title:</Form.Label>
						<Form.Control as="textarea"
									  rows={1}
									  name="title"
									  value={this.state.exercise.title}
									  onChange={event => this.handleChange(event)}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description:</Form.Label>
						<Form.Control as="textarea"
									  rows={3}
									  name="description"
									  value={this.state.exercise.description}
									  onChange={event => this.handleChange(event)}/>
					</Form.Group>
					<Form.File
						id="thumbImage"
						label={'Upload an image file'}
						data-browse="Pick the image"
						custom
						onChange={event => this.handleFileUpload(event)}/>

					<Button variant="primary"
							type="submit"
							size="lg"
							block>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default AddExercise;