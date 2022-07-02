import { SORT_BY_PRICE, FILTER_BY_RATING, FILTER_BY_SEARCH, CLEAR_FILTER } from "./constant"

export const productReducer = (state, action) => {
	switch (action.type) {
		case SORT_BY_PRICE:
			return {
				...state,
				sort: action.payload,
			}
		case FILTER_BY_RATING:
			return {
				...state,
				byRating: action.payload,
			}
		case FILTER_BY_SEARCH:
			return {
				...state,
				searchQuery: action.payload,
			}
		case CLEAR_FILTER: {
			return {
				byRating: 0,
				searchQuery: "",
			}
		}
	}
}
