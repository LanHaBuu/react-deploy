import PropTypes from 'prop-types'
import { useState } from "react"

import { images } from '../../assests/image'

function Image({ src, ...props }) {
    const [fallback, setFallback] = useState('')

    return (
        <img {...props} src={fallback || src} onError={() => setFallback(images.noImage)} />
    )
}
Image.propTypes = {
    src: PropTypes.string,
}
export default Image