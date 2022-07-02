import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"

import { Cart } from "../../context/Context"
import styles from "./Input.module.css"
import { filterBySearch } from "../../context/actions"
const cx = classNames.bind(styles)

function Input({ className }) {
	const [state, dispatch, productState, productDispatch] = useContext(Cart)
	return (
		<div className={cx("search-input-wrapper", className)}>
			<input
				onChange={(e) => productDispatch(filterBySearch(e.target.value))}
				className={cx("search-input", "col-sm-5")}
				placeholder="Bạn cần tìm gì..."
			/>
			<button className={cx("search-icon")}>
				<FontAwesomeIcon icon={faSearch} />
			</button>
		</div>
	)
}
export default Input
