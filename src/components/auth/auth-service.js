import axios from 'axios';

class AuthService {
	constructor() {
		this.service = axios.create({
			// baseUrl: 'http://localhost:5000/api',
			withCredentials: true
		});
	}

	signup = (username, email, password) => {
		console.log('in signup');
		return this.service.post('http://localhost:5000/api/signup', {
			username, email, password
		})
			.then(response => response.data);
	};

	login = (email, password) => {
		return this.service.post('http://localhost:5000/api/login', {
			email, password
		})
			.then(response => response.data);
	};

	logout = () => {
		return this.service.post('http://localhost:5000/api/logout', {})
			.then(response => response.data);
	};
}

export default AuthService;