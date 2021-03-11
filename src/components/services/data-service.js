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

async function getExerciseById(exerciseId) {
	const exercise = await axios.get(`${process.env.REACT_APP_API_URL}/exercise/${exerciseId}`, {
		withCredentials: true
	});
	return exercise.data;
};

async function deleteWorkout(workoutId) {
	const workout = await axios.delete(`${process.env.REACT_APP_API_URL}/workout/${workoutId}`, {
		withCredentials: true
	});
	return workout.data;
};

async function deleteExercise(exerciseId) {
	const exercise = await axios.delete(`${process.env.REACT_APP_API_URL}/exercise/${exerciseId}`, {
		withCredentials: true
	});
	return exercise.data;
};

async function getTrainer() {
	const trainers = await axios.get(`${process.env.REACT_APP_API_URL}/user/trainer`, {
		withCredentials: true
	});
	return trainers.data;
};

async function getUserById(userId) {
	const user = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		withCredentials: true
	});
	return user.data;
};

async function createExercise(title, description, oneImage) {
	const newExercise = await axios.post(`${process.env.REACT_APP_API_URL}/exercise/create`, {
		title,
		description,
		oneImage
	}, {
		withCredentials: true
	});
	return newExercise.data;
}

async function createWorkout(title, description) {
	const newWorkout = await axios.post(`${process.env.REACT_APP_API_URL}/workout/create`, {
		title,
		description
	}, {
		withCredentials: true
	});
	return newWorkout.data;
}

async function userModelPushArray(userId, model, dataId) {
	const user = await axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		model,
		dataId
	}, {
		withCredentials: true
	});
	return user.data;
}

async function userModelPullArray(userId, model, dataId) {
	const user = await axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		model,
		dataId
	}, {
		withCredentials: true
	});
	return user.data;
}

export {
	getWorkouts,
	getExercises,
	getTrainer,
	getUserById,
	getExerciseById,
	createExercise,
	createWorkout,
	userModelPushArray,
	userModelPullArray,
	deleteWorkout,
	deleteExercise
};