import {
	ADD_TO_CART,
	CLEAR_FILTER,
	DETELE_TO_CART,
	FILTER_BY_RATING,
	FILTER_BY_SEARCH,
	SORT_BY_PRICE,
	UPDATE_TO_CART,
} from "./constant"

export const addToCart = (payload) => {
	return {
		type: ADD_TO_CART,
		payload,
	}
}

export const deleteToCart = (payload) => {
	return {
		type: DETELE_TO_CART,
		payload,
	}
}

export const updateToCart = (payload) => {
	return {
		type: UPDATE_TO_CART,
		payload,
	}
}

export const sortByPrice = (payload) => {
	return {
		type: SORT_BY_PRICE,
		payload,
	}
}

export const filterByRaTing = (payload) => {
	return {
		type: FILTER_BY_RATING,
		payload,
	}
}

export const filterBySearch = (payload) => {
	return {
		type: FILTER_BY_SEARCH,
		payload,
	}
}

export const clearFilter = (payload) => {
	return {
		type: CLEAR_FILTER,
		payload,
	}
}
