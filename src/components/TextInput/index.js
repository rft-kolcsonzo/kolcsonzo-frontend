import React from 'react'
import MaskedInput from 'react-input-mask'

import './style.scss'

export default function TextInput({
  className,
  multiline,
  masked = false,
  ...otherProps
}) {
  let props = {
    className: ['input', className].join(' ').trim(),
    ...otherProps,
  }
  let inputType = 'input'

  if (multiline) {
    inputType = 'textarea'
  }

  if (masked || props.mask) {
    inputType = MaskedInput
  }

  return React.createElement(inputType, props)
}
