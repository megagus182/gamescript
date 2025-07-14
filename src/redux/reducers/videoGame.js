import { createSlice } from '@reduxjs/toolkit';
const page = window.sessionStorage.getItem('page')
	? JSON.parse(window.sessionStorage.getItem('page'))
	: 1;

const filters = window.sessionStorage.getItem('filters')
	? JSON.parse(window.sessionStorage.getItem('filters'))
	: {

		name: '',
		rating: '',
		price: '',
		genre: '',
		sort: ''
	};


const initialState = {
	games: [],
	totalResults: 0,
	discounts: [],
	details: {},
	page,
	loading: false,
	filters,
	gameComments: [],
	gameQuestions: [],
	genres: []
};

const videoGameSlice = createSlice({
	name: 'videogames',
	initialState,
	reducers: {
		getAllGames: (state, { payload }) => {
			state.games = payload.games;
			state.totalResults = payload.totalResults;
			state.loading = false;
		},
		getGameById: (state, { payload }) => {
			state.details = payload;
			state.loading = false;
		},
		getAllDiscounts: (state, { payload }) => {
			state.discounts = payload;
		},
		filterByPrice: (state, { payload }) => {
			state.filters = {
				...state.filters,
				price: payload,
			};
			state.page = 1;
		},
		filterByRating: (state, { payload }) => {
			state.filters = {
				...state.filters,
				rating: payload,
			};
			state.page = 1;
		},
		filterByGenre: (state, { payload }) => {
			state.filters = {
				...state.filters,
				genre: payload,
			};
			state.page = 1;
		},
		orderAlphabetically: (state, { payload }) => {
			state.filters = {
				...state.filters,
				sort: payload,
			};
		},
		filterBySearch: (state, { payload }) => {
			state.filters = {

				name: payload,
				rating: '' ,
				price: 0,
				genre: '',
				sort: '',
			};
			state.page = 1;
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		setLoading: (state) => {
			state.loading = true;
		},
		cleanFilter: (state) => {
			state.filters = {
				name: '',
				rating: '',
				price: 0,
				genre: '',
				sort: '',
			};
			state.page = 1;
		},
		getGameComments: (state, { payload }) => {
			state.gameComments = payload;
		},
		rowVideoGames: (state, { payload }) => {
			state.rowVideoGames = payload;
		},
		setGameComments: (state, { payload }) => {
			state.gameComments = [...state.gameComments, payload];
		},
		getGameQuestions: (state, { payload }) => {
			state.gameQuestions = payload;
		},
		setGameQuestions: (state, { payload }) => {
			state.gameQuestions = [...state.gameQuestions, payload];
		},
		getAllGenres: (state, { payload }) => {
			state.genres = payload;
		},
		postAllGames: (state, { payload }) => {
			state = payload
		},
		putAllGames: (state, { payload }) => {
			state.games = payload;
		},
	},
});

export const {
	getAllGames,
	getGameById,
	getAllDiscounts,
	filterByPrice,
	filterByRating,
	filterByGenre,
	orderAlphabetically,
	filterBySearch,
	changePage,
	setLoading,
	cleanFilter,
	getGameComments,
	setGameComments,
	getGameQuestions,
	setGameQuestions,
	getAllGenres,
	postAllGames,
	putAllGames,
} = videoGameSlice.actions;

export default videoGameSlice.reducer;
