import React from 'react'
import Button from '../Button'

export default function IconButton({ src, ...otherProps }) {
  return (
    <Button {...otherProps}>
      <img src={src} alt="" />
    </Button>
  )
}
