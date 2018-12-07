import React, { PureComponent } from 'react'

import FormErrorContext from './context'

export { default as FormElement } from './FormElement'
export { default as FormRow } from './FormRow'
export { default as FormButtonBar } from './FormButtonBar'
export { default as ValidatorFactory } from './validator'

class Form extends PureComponent {
  state = {
    formRef: React.createRef(),
    errors: [],
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps({ forwardedRef }) {
    if (forwardedRef) {
      return { formRef: forwardedRef }
    }

    return null
  }

  handleSubmit(e) {
    const { validator, onSubmit, onError } = this.props

    if (validator) {
      e.preventDefault()

      const errors = validator(new FormData(this.state.formRef.current))
      this.setState({ errors })
      if (errors && errors.length) {
        if (typeof onError === 'function') {
          onError(errors)
        }
        return
      }
    }

    if (typeof onSubmit === 'function') {
      onSubmit(e)
    }
  }

  render() {
    const {
      forwardedRef,
      validator,
      onError,
      onSubmit,
      children,
      ...otherProps
    } = this.props
    const { formRef, errors } = this.state

    return (
      <form ref={formRef} {...otherProps} onSubmit={this.handleSubmit}>
        <FormErrorContext.Provider value={errors}>
          {children}
        </FormErrorContext.Provider>
      </form>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <Form {...props} forwardedRef={ref} />
))
