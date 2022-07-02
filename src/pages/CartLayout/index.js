import classNames from "classnames/bind"
import { useContext, useEffect, useState } from "react"
import { AiFillDelete } from "react-icons/ai"

import Header from "../../layouts/Header"
import styles from "./CartLayout.module.css"
import { Cart } from "../../context/Context"
import Image from "../../components/Image"
import Rating from "../../components/Rating"
import { deleteToCart, updateToCart } from "../../context/actions"

const cx = classNames.bind(styles)
function CartLayout() {
	const [state, dispatch] = useContext(Cart)
	const { cart } = state

	const [total, setTotal] = useState()

	useEffect(() => {
		setTotal(
			cart.reduce((arr, cur) => {
				return arr + Number(cur.price) * cur.qty
			}, 0)
		)
	}, [cart])

	return (
		<>
			<Header className={cx("header")}>
				<></>
			</Header>
			<div className="container-fluid mt-5">
				<div className="row">
					<div className="col-xl-7">
						{cart.map((item) => (
							<div
								className="cart-products mb-5 rounded-3"
								style={{ border: "1px solid" }}
								key={item.id}
							>
								<div className="cart-product d-flex align-items-center px-2 py-3">
									<Image src={item.category.image} style={{ width: 300 }} />
									<div className="cart-product-detail ms-5">
										<span>{item.title}</span>
										<span className="me-5 ms-5">${item.price}</span>
										<Rating rating={item.rating} />
										<input
											className="ms-5 me-5"
											value={item.qty}
											type="number"
											style={{ border: "1px solid" }}
											min="1"
											onChange={(e) =>
												dispatch(
													updateToCart({
														id: item.id,
														qty: e.target.value,
													})
												)
											}
										/>
										<AiFillDelete
											onClick={() => dispatch(deleteToCart(item))}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="col-xl-5">
						<div className={cx("filters")}>
							<span className="filters-title">Có: {cart.length} sản phẩm</span>
							<div className={cx("filter-total")}>Tổng cộng: ${total}</div>
							<button
								className="btn btn-primary w-100 mt-5 fs-5 py-4"
								disabled={cart.length === 0}
							>
								Đồng ý mua sản phẩm
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CartLayout
