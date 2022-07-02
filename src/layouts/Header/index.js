import PropTypes from "prop-types"
import classNames from "classnames/bind"
import "bootstrap/dist/css/bootstrap.min.css"
import { Dropdown } from "react-bootstrap"
import { useContext, useEffect, useRef, useState } from "react"
import { routeConfig } from "../../components/config/route"
import { FaShoppingCart } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { BsMenuUp } from "react-icons/bs"

import styles from "./Header.module.css"
import logo from "../../assests/image/logo/logo-white.png"
import cartEmpty from "../../assests/image/cart/cart-empty.png"
import Image from "../../components/Image"
import Modal from "../Modal"
import Button from "../../components/Button"
import { Cart } from "../../context/Context"
import { deleteToCart } from "../../context/actions"

const cx = classNames.bind(styles)

function Header({ className, children }) {
	const [state, dispatch] = useContext(Cart)
	const [show, setShow] = useState("block")
	const [height, setHeight] = useState("350px")
	const { cart } = state
	const modalRef = useRef()
	const headerLinkRef = useRef()
	const headerRef = useRef()
	const showModal = () => {
		const modal = modalRef.current
		modal.style.display = "flex"
	}

	const showLink = () => {
		const headerLink = headerLinkRef.current
		setShow(show === "block" ? "none" : "block")
		headerLink.style.display = show

		const header = headerRef.current
		setHeight(height === "350px" ? "100%" : "350px")
		header.style.height = height
	}

	return (
		<div className={cx("header", "container-fluid", className)} ref={headerRef}>
			<div className={cx("inner", "container")}>
				<Button to={routeConfig.home}>
					<Image className={cx("logo")} src={logo} />
				</Button>
				<div className={cx("navigation")}>
					<div className={cx("header-button")} ref={headerLinkRef}>
						<Button to={routeConfig.product} className={cx("product")}>
							Sản phẩm
						</Button>
						<Button to={routeConfig.news} className={cx("news")}>
							Tin tức
						</Button>
						<Button className={cx("user")} onClick={showModal}>
							Tài khoản
						</Button>
					</div>
					<span className={cx("cart")}>
						<Dropdown>
							<Dropdown.Toggle
								variant="none"
								style={{ color: "white" }}
								id="dropdown-basic"
								className={cx("cart-inner")}
							>
								<span>
									<FaShoppingCart />
									<span className="ms-2">({cart.length})</span>
								</span>
							</Dropdown.Toggle>

							<Dropdown.Menu>
								{cart.length > 0 ? (
									<>
										{cart.map((item) => (
											<span className={cx("cart-item")} key={item.id}>
												<Image
													src={item.category.image}
													className={cx("cart-img")}
												/>
												<div className={cx("cart-detail")}>
													<span>{item.title}</span>
													<div>${item.price}</div>
												</div>
												<AiFillDelete
													className={cx("cart-icon-del")}
													onClick={() => dispatch(deleteToCart(item))}
												/>
											</span>
										))}
										<Button to="/cart" className={cx("move-cart")}>
											Đến giỏ hàng
										</Button>
									</>
								) : (
									<>
										<Image src={cartEmpty} style={{ width: 250 }} />
										<span style={{ fontSize: 20 }}>Chưa có sản phẩm</span>
									</>
								)}
							</Dropdown.Menu>
						</Dropdown>
					</span>
				</div>
				{/* menu mobile */}
				<BsMenuUp
					className={cx("menu-mobile")}
					onClick={() => showLink()}
					style={{ userSelect: "none" }}
				/>
				{/* end menu mobile */}
			</div>
			{children}
			<Modal ref={modalRef} />
		</div>
	)
}

Header.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
}

export default Header
