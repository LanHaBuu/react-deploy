import PropTypes from 'prop-types'

import './GlobalStyle.module.css'

function GlobalStyle({ children }) {
    return children
}

GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GlobalStyle