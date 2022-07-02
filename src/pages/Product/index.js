import { useState, useEffect, useContext, useRef } from "react"
import { FiSliders } from "react-icons/fi"
import { FcFilledFilter } from "react-icons/fc"
import classNames from "classnames/bind"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import Input from "../../components/Input"
import Footer from "../../layouts/Footer"
import ProductLayout from "../../layouts/ProductLayout"
import styles from "./Product.module.css"
import Button from "../../components/Button"
import Rating from "../../components/Rating"
import { Cart } from "../../context/Context"
import {
	addToCart,
	clearFilter,
	deleteToCart,
	filterByRaTing,
	sortByPrice,
} from "../../context/actions"
import Pagination from "../../components/Pagination"

const cx = classNames.bind(styles)

function Product() {
	const [state, dispatch, productState, productDispatch] = useContext(Cart)
	const { byRating, sort, searchQuery } = productState
	const { cart } = state
	const [products, setProducts] = useState([])
	const [filter, setFilter] = useState(products)
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [productInOnePage, setProductInOnePage] = useState(18)
	const [showFilterForm, setShowFilterForm] = useState("block")

	const filterFormRef = useRef()

	useEffect(() => {
		setLoading(true)
		fetch("https://api.escuelajs.co/api/v1/products")
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.length; i++) {
					data[i].rating = Math.floor(Math.random() * 5 + 1)
				}
				setProducts(data)
				setFilter(data)
				setLoading(false)
			})
	}, [])

	// Phan trang

	const indexOfLastPost = currentPage * productInOnePage
	const indexOfFirstPost = indexOfLastPost - productInOnePage
	const currentProduct = products.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

	//Tim tat ca san pham
	const filterProduct = (key) => {
		const update = filter.filter((item) => item.category.name === key)
		setProducts(update)
	}

	//Lọc
	const transformProduct = () => {
		let sortedProduct = currentProduct
		if (sort) {
			sortedProduct = sortedProduct.sort((a, b) =>
				sort === "lowToHigh" ? a.price - b.price : b.price - a.price
			)
		}
		if (byRating) {
			sortedProduct = sortedProduct.filter((item) => item.rating === byRating)
		}

		if (searchQuery) {
			sortedProduct = sortedProduct.filter((item) =>
				item.title.toLowerCase().includes(searchQuery)
			)
		}
		return sortedProduct
	}

	// Show FilterForm on Mobile

	const showFilTerForm = () => {
		const filterForm = filterFormRef.current
		setShowFilterForm(showFilterForm === "block" ? "none" : "block")
		filterForm.style.display = showFilterForm
	}
	function Loading() {
		return (
			<>
				<div className="col-xl-4 col-sm-6 mb-4">
					<Skeleton style={{ height: 420 }} />
				</div>
				<div className="col-xl-4 col-sm-6 mb-4">
					<Skeleton style={{ height: 420 }} />
				</div>
				<div className="col-xl-4 col-sm-6 mb-4">
					<Skeleton style={{ height: 420 }} />
				</div>
				<div className="col-xl-4 col-sm-6 mb-4">
					<Skeleton style={{ height: 420 }} />
				</div>
				<div className="col-xl-4 col-sm-6 mb-4">
					<Skeleton style={{ height: 420 }} />
				</div>
				<div className="col-xl-4 col-sm-6 mb-4">
					<Skeleton style={{ height: 420 }} />
				</div>
			</>
		)
	}

	function ShowProducts() {
		return (
			<div className="row">
				{transformProduct().map((product) => (
					<div className={cx("card", "col-xl-4 col-sm-6 mb-4")} key={product.id}>
						<Button to={`/product/${product.id}`}>
							<img
								src={product.category.image}
								className="card-img-top"
								alt={product.name}
							/>
						</Button>
						<div className="card-body">
							<h5 className="card-title">{product.title}</h5>
							<p className={cx("card-text")}>{product.description}</p>
							<p className={cx("card-price")}>${product.price}</p>
							<span className={cx("card-rating")}>
								<Rating rating={product.rating} />
							</span>
							<div className="buttons d-flex justify-content-between">
								{cart.some((item) => item.id === product.id) ? (
									<Button
										className="btn btn-danger py-3 fs-5 text-center"
										onClick={() => dispatch(deleteToCart(product))}
									>
										Xoá khỏi giỏ hàng
									</Button>
								) : (
									<Button
										className="btn btn-primary py-3 fs-5 text-center"
										onClick={() => dispatch(addToCart(product))}
									>
										Thêm vào giỏ hàng
									</Button>
								)}
							</div>
						</div>
					</div>
				))}
				<Pagination
					productOnePage={productInOnePage}
					totalProducts={products.length}
					paginate={paginate}
				/>
			</div>
		)
	}

	return (
		<>
			<ProductLayout />
			<div className={cx("wrapper-input")}>
				<Input className={cx("input-product")} />
			</div>
			<div className="container mt-5">
				<div className="row">
					<div className="col-xl-3">
						<FcFilledFilter className={cx("btn-filter")} onClick={showFilTerForm} />
						<div className={cx("filter-form")} ref={filterFormRef}>
							<h3 className="title-filter">Tìm kiếm sản phẩm</h3>
							<div className="header-filter">
								<div>
									<FiSliders />
									<span className="ms-5">Lọc</span>
								</div>
							</div>
							<hr />
							<div className="content-filter">
								<div className="ascending">
									<input
										id="ascending"
										name="group1"
										type="radio"
										onChange={() => productDispatch(sortByPrice("lowToHigh"))}
										// checked={sort === "lowToHight" ? true : false}
									/>
									<label className="ms-2" htmlFor="ascending">
										Giá thấp đến cao
									</label>
								</div>
								<div className="descending">
									<input
										id="descending"
										name="group1"
										type="radio"
										onChange={() => productDispatch(sortByPrice("highToLow"))}
										checked={sort === "highToLow" ? true : false}
									/>
									<label className="ms-2" htmlFor="descending">
										Giá cao đến thấp
									</label>
								</div>
								<hr />
								<div className="category">
									<h2 className="mb-4">Danh mục sản phẩm</h2>
									<div className={cx("category-buttons")}>
										<button
											className="btn btn-outline-dark d-block py-3 px-5 mb-3 fs-5 ms-2"
											style={{ width: 150 }}
											onClick={() => setProducts(filter)}
										>
											All
										</button>
										<button
											className="btn btn-outline-dark d-block py-3 px-5 mb-3 fs-5 ms-2"
											style={{ width: 150 }}
											onClick={() => filterProduct("Clothes")}
										>
											Clothes
										</button>
										<button
											className="btn btn-outline-dark d-block py-3 px-5 mb-3 fs-5 ms-2"
											style={{ width: 150 }}
											onClick={() => filterProduct("Shoes")}
										>
											Shoes
										</button>
										<button
											className="btn btn-outline-dark d-block py-3 px-5 mb-3 fs-5 ms-2"
											style={{ width: 150 }}
											onClick={() => filterProduct("Furniture")}
										>
											Furniture
										</button>
										<button
											className="btn btn-outline-dark d-block py-3 px-5 mb-3 fs-5 ms-2"
											style={{ width: 150 }}
											onClick={() => filterProduct("Electronics")}
										>
											Electronics
										</button>
										<button
											className="btn btn-outline-dark d-block py-3 px-5 mb-3 fs-5 ms-2"
											style={{ width: 150 }}
											onClick={() => filterProduct("Others")}
										>
											Others
										</button>
									</div>
								</div>
								<hr />
								<div className="rating">
									<div>Lọc theo mức độ đánh giá</div>
									<div>
										<div className="my-3">
											<Rating
												rating={byRating}
												onClick={(i) =>
													productDispatch(filterByRaTing(i + 1))
												}
											/>
										</div>
										<button
											className="btn btn-outline-dark fs-5 px-5 py-3"
											onClick={() => productDispatch(clearFilter())}
										>
											BỎ LỌC
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="row">{loading ? <Loading /> : <ShowProducts />}</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Product
