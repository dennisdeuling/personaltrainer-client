import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form} from 'react-bootstrap';

class AddExercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			thumbImage: ''
		};
	}

	handleFileUpload = event => {
		const uploadData = new FormData();
		uploadData.append('thumbImageUrl', event.target.files[0]);
		axios.post('http://localhost:5000/api/upload', uploadData)
			.then(response => {
				console.log(`Response from API: ${response}`);
				this.setState({
					thumbImage: response.data.thumbImageUrl
				});
			}, error => {
				console.error(error);
			});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		const {title, description, thumbImage} = this.state;

		axios.post('http://localhost:5000/api/exercise/create', {
			title,
			description,
			thumbImage
		}, {withCredentials: true})
			.then(result => {
				this.setState({
					title: '',
					description: '',
					thumbImage: ''
				});
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
		console.log();
		return (
			<div>
				<Form onSubmit={this.handleFormSubmit}>
					<Form.Group>
						<Form.Label>Title:</Form.Label>
						<Form.Control as="textarea"
									  rows={1}
									  name="title"
									  value={this.state.title}
									  onChange={event => this.handleChange(event)}/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description:</Form.Label>
						<Form.Control as="textarea"
									  rows={3}
									  name="description"
									  value={this.state.description}
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