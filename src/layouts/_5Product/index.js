import { useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from "./_5Product.module.css"
import Image from "../../components/Image"
import { Link } from "react-router-dom"

const cx = classNames.bind(styles)

function _5Products({ title, start, end }) {
	const [products, setProducts] = useState([])

	useEffect(() => {
		fetch("https://api.escuelajs.co/api/v1/products")
			.then((res) => res.json())
			.then((data) => setProducts(data))
	}, [])

	return (
		<div className="container mt-5 mb-5">
			<div className="row">
				<div className="col-xl-12">
					<div className="title d-flex justify-content-between mb-5">
						<span className={cx("title-product")}>{title}</span>
						<Link to="/product" className={cx("btn-product")}>
							Xem thêm
						</Link>
					</div>
					<div className="row">
						{products.slice(start, end).map((item) => (
							<div className={cx("img", "col-xl-3 col-md-6")} key={item.id}>
								<Image src={item.category.image} className={cx("product-img")} />
								<div
									className={cx("desc", "px-2 py-1")}
									style={{ fontSize: "2rem" }}
								>
									<p className="name">{item.title}</p>
									<p>Giá hiện tại</p>
									<p>${item.price}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default _5Products
