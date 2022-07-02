import "./Input/Input.module.css"

function Pagination({ productOnePage, totalProducts, paginate }) {
	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(totalProducts / productOnePage); i++) {
		pageNumbers.push(i)
	}

	return (
		<ul className="pagination flex-wrap">
			{pageNumbers.map((numbers) => (
				<li key={numbers} className="mb-3">
					<button
						className="btn btn-outline-primary ms-5 fs-5 px-4 py-2 btn-page"
						onClick={() => paginate(numbers)}
					>
						{numbers}
					</button>
				</li>
			))}
		</ul>
	)
}

export default Pagination
