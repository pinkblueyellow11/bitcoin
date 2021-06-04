import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'native-base'

const Spacer = ({ size, flex, backgroundColor }) => <View style={{ flex, height: size, backgroundColor }} />

Spacer.propTypes = {
  size: PropTypes.number,
  flex: PropTypes.number,
  backgroundColor: PropTypes.string,
}

Spacer.defaultProps = {
  size: 20,
  flex: 1,
  backgroundColor: 'transparent',
}

export default Spacer
