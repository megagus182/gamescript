import axios from 'axios';
import { getGameComments, setGameComments } from '../reducers/videoGame';
import { API_URL } from '../../config';

export const getComments = (id) => {
	return async function (dispatch) {
		try {
			const { data } = await axios(API_URL + `/videogames/comments?gameID=${id}`);
			dispatch(getGameComments(data.comments));
		} catch (error) {
			dispatch(getGameComments([]))
		}
	};
};

export const postComments = (value) => {
	return async function (dispatch) {
		try {
			const { data } = await axios.post(API_URL + `/comments`, value);
			dispatch(setGameComments(data));
		} catch (error) {
			return;
		}
	};
};

export const updateComments = (value) => {
	return async function (dispatch) {
		try {
			await axios.put(API_URL + `/comments`, value.comment)
		} catch (error) {
			return;
		}
	};
};