import classNames from "classnames/bind"

import styles from "./Footer.module.css"
import logo from "../../assests/image/logo/logo-white.png"
import Image from "../../components/Image"
import Button from "../../components/Button"

const cx = classNames.bind(styles)

function Footer({ className }) {
	return (
		<footer className={cx("container-fluid", className)} style={{ backgroundColor: "#333" }}>
			<div className="container">
				<div className="row align-items-center py-4">
					<div className={cx("logo-footer", "col-xl-3 col-md-4 col-12")}>
						<Image src={logo} />
					</div>
					<div className={cx("footer-link", "col-xl-9 col-md-8 col-12")}>
						<div className={cx("buttons")}>
							<Button className={cx("btn-footer")} href="#">
								Các câu hỏi thường gặp
							</Button>
							<Button className={cx("btn-footer")} href="#">
								Điều khoản
							</Button>
							<Button className={cx("btn-footer")} href="#">
								Chính sách
							</Button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
