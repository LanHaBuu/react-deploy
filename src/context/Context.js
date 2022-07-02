import PropTypes from "prop-types"
import { createContext, useEffect, useReducer, useState } from "react"
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer"

export const Cart = createContext()
function Context({ children }) {
	const [products, setProducts] = useState([])
	useEffect(() => {
		fetch("https://api.escuelajs.co/api/v1/products")
			.then((res) => res.json())
			.then((data) => setProducts(data))
	}, [])

	const [state, dispatch] = useReducer(cartReducer, {
		products,
		cart: [],
	})

	const [productState, productDispatch] = useReducer(productReducer, {
		byRating: 0,
		searchQuery: "",
	})

	return (
		<Cart.Provider value={[state, dispatch, productState, productDispatch]}>
			{children}
		</Cart.Provider>
	)
}

Context.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Context
