import classNames from "classnames/bind"
import { Dropdown } from "react-bootstrap"

import styles from "./ProductLayout.module.css"
import Header from "../Header"

const cx = classNames.bind(styles)

function ProductLayout() {
	return (
		<Header className={cx("header-product")}>
			<></>
		</Header>
	)
}

export default ProductLayout
