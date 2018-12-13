import React from 'react'
import './style.scss'

export default function TextInput({ className, multiline, ...otherProps }) {
  const props = {
    className: ['input', className].join(' ').trim(),
    ...otherProps,
  }

  if (multiline) {
    return <textarea {...props} />
  }

  return <input {...props} />
}
