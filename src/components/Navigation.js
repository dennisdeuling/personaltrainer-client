import React, {Component} from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AuthService from './services/auth-service';

class Navigation extends Component {
	service = new AuthService();

	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.user
		};
	}

	logOutUser = () => {
		this.service.logout()
			.then(() => {
				this.props.getUser(null);
			});
	};

	render() {
		return (
			<div>
				{this.state.loggedInUser.userGroup === 'trainer' &&
				<Nav variant="tabs" defaultActiveKey="/profile">
					<Nav.Item>
						<Nav.Link href="/profile">
							<Link to="/profile">Profile</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/workouts">
							<Link to="/workouts">Workouts</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/exercises">
							<Link to="/exercises">Exercises</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/exercises/add">
							<Link to="/exercises/add">Add Exercise</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/login">
							<Link to="/login" onClick={() => this.logOutUser()}>Log out</Link>
						</Nav.Link>
					</Nav.Item>
				</Nav>
				}
				{this.state.loggedInUser.userGroup === 'client' &&
				<Nav variant="tabs" defaultActiveKey="/dashboard">
					<Nav.Item>
						<Nav.Link href="/dashboard">
							<Link to="/dashboard">Trainerlist</Link>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/login">
							<Link to="/login" onClick={() => this.logOutUser()}>Log out</Link>
						</Nav.Link>
					</Nav.Item>
				</Nav>
				}
			</div>
		);
	}
}

export default Navigation;
