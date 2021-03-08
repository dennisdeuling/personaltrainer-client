import React, {Component} from 'react';
import {getUserById} from '../services/data-service';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				loggedIn: '',
				userDB: ''
			}

		};
	}

	componentDidMount() {
		const {_id: userId} = this.props.user;
		getUserById(userId)
			.then(response => {
				this.setState({
					user: {
						loggedIn: this.props.user,
						userDB: response
					}
				});
				console.log(response);
			}, error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}

export default Dashboard;