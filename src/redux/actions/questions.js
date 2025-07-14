import axios from 'axios';
import { getGameQuestions, setGameQuestions } from '../reducers/videoGame';
import { API_URL } from '../../config';

export const getQuestions = (id) => {
	return async function (dispatch) {
		try {
			const { data } = await axios(API_URL + `questions?gameId=` + id);
			dispatch(getGameQuestions(data));
		} catch (error) {
			dispatch(getGameQuestions([]))
		}
	};
};

export const postQuestion = (value) => {
	return async function (dispatch) {
		try {
			const { data } = await axios.post(API_URL + `questions`, value);
			dispatch(setGameQuestions(data.question));
		} catch (error) {
			return;
		}
	};
};
