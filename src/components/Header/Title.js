import React from 'react'
import { connect } from 'react-redux'

import { setTitle } from '../../actions'

function Title({ setTitle, children: title }) {
  setTitle(title)
  return null
}

export default React.memo(
  connect(
    null,
    dispatch => ({ setTitle: title => dispatch(setTitle(title)) })
  )(Title),
  (prevProps, nextProps) => prevProps.children === nextProps.children
)
