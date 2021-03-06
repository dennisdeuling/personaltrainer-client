import axios from 'axios';

async function getWorkouts() {
	const workouts = await axios.get(`${process.env.REACT_APP_API_URL}/workout`, {
		withCredentials: true
	});
	return workouts.data;
};

async function getExercises() {
	const exercises = await axios.get(`${process.env.REACT_APP_API_URL}/exercise`, {
		withCredentials: true
	});
	return exercises.data;
};

async function getTrainer() {
	const trainers = await axios.get(`${process.env.REACT_APP_API_URL}/trainer`, {
		withCredentials: true
	});
	return trainers.data;
};

export {getWorkouts, getExercises, getTrainer};