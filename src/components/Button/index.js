import { forwardRef } from "react"
import { Link } from "react-router-dom"
import classNames from "classnames/bind"

import styles from "./Button.module.css"

const cx = classNames.bind(styles)

function Button({ primary = false, href, to, children, className, onClick }, ref) {
	let Component = "button"
	const props = { onClick }

	if (href) {
		Component = "a"
		props.href = href
	}

	if (to) {
		Component = Link
		props.to = to
	}

	const classes = cx("wrapper", {
		[className]: className,
		primary,
	})

	return (
		<Component {...props} className={classes} ref={ref}>
			{children}
		</Component>
	)
}

export default forwardRef(Button)
