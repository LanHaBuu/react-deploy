import classNames from "classnames/bind"

import styles from "./NewsLayout.module.css"
import Header from "../Header"

const cx = classNames.bind(styles)

function NewsLayout() {
	return (
		<>
			<Header className={cx("header-news")}>
				<div className={cx("content-header")}>
					<h1 className={cx("slogan")}>Tin tức</h1>
				</div>
			</Header>
		</>
	)
}

export default NewsLayout
