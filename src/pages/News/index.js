import classNames from "classnames/bind"
import styles from "./News.module.css"
import NewsLayout from "../../layouts/NewsLayout"
import Footer from "../../layouts/Footer"
const cx = classNames.bind(styles)
function News() {
	return (
		<>
			<NewsLayout />
			<div className="container">
				<div className="row">
					<div className="col-xl-12 col-12">
						<h1 className="mt-5">Đang cập nhật ...</h1>
					</div>
				</div>
			</div>
			<Footer className={cx("footer-news")} />
		</>
	)
}

export default News
