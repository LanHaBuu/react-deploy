import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import classNames from "classnames/bind"
import styles from "./Oneproduct.module.css"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Rating from "../../components/Rating"
import Header from "../../layouts/Header"
import Footer from "../../layouts/Footer"

const cx = classNames.bind(styles)

function OneProduct() {
	let { id } = useParams()
	const [product, setProducts] = useState()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
			.then((res) => res.json())
			.then((data) => {
				data.rating = Math.floor(Math.random() * 5 + 1)
				setProducts(data)
				setLoading(false)
			})
	}, [])

	function Loading() {
		return (
			<>
				<div className="col-sm-6 mt-4">
					<Skeleton style={{ width: 600, height: 400 }} />
				</div>
				<div className="col-sm-6 mt-4">
					<Skeleton
						style={{ width: 250, height: 35, display: "block", margin: "auto" }}
					/>
					<Skeleton style={{ height: 70 }} />
					<Skeleton style={{ height: 30, marginTop: 20 }} />
				</div>
			</>
		)
	}

	function ShowProduct() {
		return (
			<>
				<div className="col-sm-6">
					<img
						src={product?.category?.image}
						alt={product?.title}
						className={cx("product-img")}
					/>
				</div>
				<div className="col-sm-6">
					<h2 className={cx("product-title")}>Danh mục: {product?.category?.name}</h2>
					<div className={cx("title")}>Tên: {product?.title}</div>
					<div className={cx("product-des")}>{product?.description}</div>
					<div className={cx("product-rating")}>
						<span>Đánh giá: </span>
						<Rating rating={product?.rating} />
					</div>
					<span className={cx("product-price")}>Price: ${product?.price}</span>
				</div>
			</>
		)
	}

	return (
		<>
			<Header className={cx("header")}>
				<></>
			</Header>
			<div className="container mt-5">
				<div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
			</div>
			<Footer className={cx("footer-one-product")} />
		</>
	)
}

export default OneProduct
