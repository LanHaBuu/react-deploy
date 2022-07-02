import Home from "../pages/Home"
import News from "../pages/News"
import Product from "../pages/Product"
import OneProduct from "../pages/OneProduct"
import CartLayout from "../pages/CartLayout"
import { routeConfig } from "../components/config/route"

export const publicRoutes = [
	{ path: routeConfig.home, component: Home },
	{ path: routeConfig.news, component: News },
	{ path: routeConfig.product, component: Product },
	{ path: routeConfig.oneproduct, component: OneProduct },
	{ path: routeConfig.cart, component: CartLayout },
]
