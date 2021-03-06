import axios from 'axios';

class AuthService {
	constructor() {
		this.service = axios.create({
			// baseUrl: process.env.REACT_APP_API_URL,
			withCredentials: true
		});
	}

	signup = (username, email, password, userGroup) => {
		return this.service.post(`${process.env.REACT_APP_API_URL}/signup`, {
			username, email, password, userGroup
		})
			.then(response => response.data);
	};

	login = (email, password) => {
		return this.service.post(`${process.env.REACT_APP_API_URL}/login`, {
			email, password
		})
			.then(response => response.data);
	};

	logout = () => {
		return this.service.post(`${process.env.REACT_APP_API_URL}/logout`, {})
			.then(response => response.data);
	};
}

export default AuthService;