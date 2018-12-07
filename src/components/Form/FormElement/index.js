import React from 'react'

import FormElement from './component'
import FormErrorContext from '../context'

function WrappedFormElement({ name, ...otherProps }) {
  if (name) {
    return (
      <FormErrorContext.Consumer>
        {errors => (
          <FormElement
            errors={errors
              .filter(([field]) => field === name)
              .map(([, msg]) => msg)}
            {...otherProps}
          />
        )}
      </FormErrorContext.Consumer>
    )
  }

  return <FormElement {...otherProps} />
}

export default React.memo(WrappedFormElement)
