import HomeLayout from "../../layouts/HomeLayout"
import _5Products from "../../layouts/_5Product"
import banner1 from "../../assests/image/banner/promo-banner-1-lg.png"
import banner2 from "../../assests/image/banner/promo-banner-2-lg.png"
import banner3 from "../../assests/image/banner/promo-banner-3-lg.png"
import Footer from "../../layouts/Footer"
const start = Math.floor(Math.random() * 200)
function Home() {
	return (
		<>
			<HomeLayout />
			<_5Products title={"Sản phẩm bán chạy"} start={5} end={9} />
			<img src={banner1} className="img-fluid mt-5" />
			<_5Products title={"Obo lựa chọn"} start={start} end={start + 4} />
			<img src={banner2} className="img-fluid mt-5" />
			<_5Products title={'Thấp hơn "Giá hãng"'} start={50} end={54} />
			<img src={banner3} className="img-fluid mt-5" />
			<Footer />
		</>
	)
}

export default Home
