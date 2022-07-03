import { BrowserRouter, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					{publicRoutes.map((routes, index) => {
						const Pages = routes.component
						return <Route key={index} path={routes.path} element={<Pages />} />
					})}
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
