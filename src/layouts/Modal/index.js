import { forwardRef, useEffect, useRef, useState } from "react"
import classNames from "classnames/bind"
import styles from "./Modal.module.css"
import Button from "../../components/Button"

const stopPropagation = (e) => {
	e.stopPropagation()
}

const cx = classNames.bind(styles)

function Modal(props, ref) {
	const formSignInRef = useRef()
	const formSignUpRef = useRef()
	const btnSignIn = useRef()
	const btnSignUp = useRef()
	const inputRef = useRef()

	const hideModal = () => {
		const modal = ref.current
		modal.style.display = "none"
	}

	const showSignUp = () => {
		formSignInRef.current.style.display = "none"
		formSignUpRef.current.style.display = "block"
		btnSignIn.current.style.backgroundColor = "transparent"
		btnSignUp.current.style.backgroundColor = "#D5D6D6"
	}

	const showSignIn = () => {
		formSignInRef.current.style.display = "block"
		formSignUpRef.current.style.display = "none"
		btnSignIn.current.style.backgroundColor = "#D5D6D6"
		btnSignUp.current.style.backgroundColor = "transparent"
	}

	// Đăng ký

	const initStateSignIn = { username: "", phone: "", email: "", password: "", confirmPass: "" }

	const [formSignInValue, setFormSignInValue] = useState(initStateSignIn)
	const [formErrors, setFormErrors] = useState({})
	const [isSubmitSignIn, setIsSubmitSignIn] = useState(false)

	const handleSignIn = (e) => {
		const { name, value } = e.target
		setFormSignInValue({ ...formSignInValue, [name]: value })
	}

	const handleSubmitSignIn = (e) => {
		e.preventDefault()
		setFormErrors(validate(formSignInValue))
		setIsSubmitSignIn(true)
	}

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitSignIn) {
			localStorage.setItem("accounts", JSON.stringify(formSignInValue))
			alert("Bạn đã đăng ký thành công, hãy đăng nhập")
			window.location.reload()
		}
	}, [formErrors])

	const validate = (values) => {
		const errors = {}
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		if (!values.username) {
			errors.username = "Vui lòng nhập họ tên"
		}
		if (!values.phone) {
			errors.phone = "Vui lòng nhập số điện thoại"
		} else if (typeof values.phone !== Number && values.phone.length < 10) {
			errors.phone = "Số điện thoại không đúng định dạng"
		}
		if (!values.email) {
			errors.email = "Vui lòng nhập email"
		} else if (!emailRegex.test(values.email)) {
			errors.email = "Nhập sai địng dạng email"
		}
		if (!values.password) {
			errors.password = "Vui lòng nhập mật khẩu"
		} else if (values.password.length < 6) {
			errors.password = "Mật khẩu có độ dài tối thiểu 6 ký tự"
		}
		if (!values.confirmPass) {
			errors.confirmPass = "Vui lòng nhập lại mật khẩu"
		} else if (values.confirmPass !== values.password) {
			errors.confirmPass = "Mật khẩu không trùng khớp"
		}
		return errors
	}
	// Đăng nhập

	const initStateSignUp = { email: "", password: "" }

	const [formSignUpValue, setFormSignUpValue] = useState(initStateSignUp)
	const [formError, setFormError] = useState({})
	const accounts = JSON.parse(localStorage.getItem("accounts"))

	const handleSignUp = (e) => {
		const { name, value } = e.target
		setFormSignUpValue({ ...formSignUpValue, [name]: value })
	}

	const handleSubmitSignUp = (e) => {
		e.preventDefault()
		setFormError(validation(formSignUpValue))
	}

	const validation = (value) => {
		const err = {}
		if (value.email === accounts.email) {
			if (value.password === accounts.password) {
				console.log("Đăng nhập thành công", accounts)
			} else {
				err.password = "Mật khẩu không chính xác"
			}
		} else {
			err.email = "Email không tồn tại"
		}
		return err
	}

	return (
		<div className={cx("modal")} onClick={hideModal} ref={ref}>
			<div className={cx("modal-dialog")}>
				<div className={cx("modal-content")} onClick={stopPropagation}>
					<div className={cx("modal-header")}>
						<div className={cx("modal-list")}>
							<Button
								ref={btnSignIn}
								className={cx("btn-header-signIn")}
								onClick={showSignIn}
							>
								Đăng nhập
							</Button>
							<Button
								ref={btnSignUp}
								className={cx("btn-header-signUp")}
								onClick={showSignUp}
							>
								Đăng ký
							</Button>
						</div>
					</div>
					<div className={cx("modal-body")}>
						<div className={cx("tab-content")}>
							<div className={cx("tab-pane")} id={cx("signIn")} ref={formSignInRef}>
								<form>
									<input
										value={formSignUpValue.email}
										name="email"
										className={cx("signin-email")}
										onChange={handleSignUp}
										placeholder="Email"
									/>
									<p className={cx("err-mes")}>{formError.email}</p>
									<input
										value={formSignUpValue.password}
										type="password"
										name="password"
										className={cx("signin-pass")}
										onChange={handleSignUp}
										placeholder="Password"
									/>
									<p className={cx("err-mes")}>{formError.password}</p>
									<div className={cx("forgot-text")}>
										<p>
											Quên mật khẩu? Nhấn vào{" "}
											<a className={cx("text")}>đây</a>
										</p>
									</div>
									<Button
										primary
										onClick={handleSubmitSignUp}
										className={cx("btn-signin")}
									>
										đăng nhập
									</Button>
								</form>
							</div>
						</div>

						<div className={cx("tab-content")}>
							<div className={cx("tab-pane")} id={cx("signUp")} ref={formSignUpRef}>
								<form>
									<div className="field">
										<input
											ref={inputRef}
											value={formSignInValue.username}
											className={cx("signup-name")}
											name="username"
											onChange={handleSignIn}
											placeholder="Họ và tên *"
										/>
										<p className={cx("err-mes")}>{formErrors.username}</p>
									</div>
									<div className="field">
										<input
											ref={inputRef}
											value={formSignInValue.phone}
											className={cx("signup-phone")}
											name="phone"
											onChange={handleSignIn}
											placeholder="Số điện thoại *"
										/>
										<p className={cx("err-mes")}>{formErrors.phone}</p>
									</div>
									<div className="field">
										<input
											ref={inputRef}
											value={formSignInValue.email}
											className={cx("signup-email")}
											name="email"
											onChange={handleSignIn}
											placeholder="Email *"
										/>
										<p className={cx("err-mes")}>{formErrors.email}</p>
									</div>
									<div className="field">
										<input
											ref={inputRef}
											value={formSignInValue.password}
											type="password"
											className={cx("signup-pass")}
											name="password"
											onChange={handleSignIn}
											placeholder="Mật khẩu *"
										/>
										<p className={cx("err-mes")}>{formErrors.password}</p>
									</div>

									<div className="field">
										<input
											ref={inputRef}
											value={formSignInValue.confirmPass}
											type="password"
											className={cx("signup-confirm-pass")}
											name="confirmPass"
											onChange={handleSignIn}
											placeholder="Xác nhận lại mật khẩu *"
										/>
										<p className={cx("err-mes")}>{formErrors.confirmPass}</p>
									</div>

									<div className={cx("clause-text")}>
										<p>
											Khi bạn nhấn Đăng ký, bạn đã đồng ý thực hiện mọi giao
											dịch mua bán theo{" "}
											<a className={cx("text")}>
												điều kiện sử dụng và chính sách của OBO Stadium.
											</a>
										</p>
									</div>
									<Button
										onClick={handleSubmitSignIn}
										primary
										className={cx("btn-signup")}
									>
										đăng ký
									</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(Modal)
