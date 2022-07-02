import classNames from "classnames/bind"

import styles from "./HomeLayout.module.css"
import Header from "../Header"

const cx = classNames.bind(styles)

function HomeLayout() {
	return (
		<>
			<Header className={cx("header-home")}>
				<div className={cx("content-header")}>
					<h1 className={cx("slogan")}>BEST THINGS WITH BEST OFFERS</h1>
				</div>
			</Header>
		</>
	)
}

export default HomeLayout
