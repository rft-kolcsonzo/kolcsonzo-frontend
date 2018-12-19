import React from 'react'
import { connect } from 'react-redux'

import { setTitle, setBackState } from '../../actions'

function Title({ setTitle, setBackState, canGoBack = false, children: title }) {
  setTitle(title)
  setBackState(canGoBack)

  return null
}

export default React.memo(
  connect(
    null,
    dispatch => ({
      setTitle: title => dispatch(setTitle(title)),
      setBackState: canGoBack => dispatch(setBackState(canGoBack)),
    })
  )(Title),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.canGoBack === nextProps.canGoBack
)
