import { ADD_TO_CART, DETELE_TO_CART, UPDATE_TO_CART } from "./constant"

export const cartReducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, { ...action.payload, qty: 1 }],
			}
		case DETELE_TO_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			}
		case UPDATE_TO_CART:
			return {
				...state,
				cart: state.cart.filter((item) =>
					item.id === action.payload.id ? (item.qty = action.payload.qty) : item.qty
				),
			}
	}
}
