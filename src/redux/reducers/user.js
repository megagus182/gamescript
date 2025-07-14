import { createSlice } from '@reduxjs/toolkit';

const cartList = window.localStorage.getItem('cartList')
	? JSON.parse(window.localStorage.getItem('cartList'))
	: [];

const initialState = {
	status: 'guest',
	email: '',
	image: '',
	name: '',
	id: null,
	cartList,
	notifications: [],
	wishes: [],
	admin: false,
	emailVerified: false,
	purchases: [],
	collection: [],
	comments: [],
    userData: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setSigned: (state, { payload }) => {
			state.status = payload;
		},
		setInfo: (state, { payload }) => {
			const { id, email, deseos, cart, admin, notifications, emailVerified, image, name } = payload;
			return {
				...state,
				id,
				email,
				name,
				wishes: deseos,
				cartList: cart,
				admin,
				notifications,
				emailVerified,
				image
			};
		},
		updateCart: (state, { payload }) => {
			state.cartList = payload;
		},
		updateNotifications: (state, { payload }) => {
			state.notifications = payload;
		},
		addOne: (state, { payload }) => {
			const productRef = state.cartList.find((el) => el.id === payload);
			const newCant = ++productRef.cant;
			productRef.cant = newCant;
		},
		removeOne: (state, { payload }) => {
			const productRef = state.cartList.find((el) => el.id === payload);
			const newCant = --productRef.cant;
			productRef.cant = newCant;
		},
		updateWishes: (state, { payload }) => {
			state.wishes = payload;
		},
		addToPurchases: (state, { payload }) => {
			state.purchases = [...state.purchases, ...payload];
		},
		addToCollection: (state, { payload }) => {
			state.collection = [...state.collection, payload];
		},
		getAllUserComments: (state, { payload }) => {
			state.comments = payload;
		},
        getUserData: (state, { payload }) => {
            state.userData = payload;
        },
	},
});

export const {
	setSigned,
	updateCart,
	updateNotifications,
	addOne,
	removeOne,
	updateWishes,
	setInfo,
	addToPurchases,
	addToCollection,
	getAllUserComments,
    getUserData,
} = userSlice.actions;
export default userSlice.reducer;
