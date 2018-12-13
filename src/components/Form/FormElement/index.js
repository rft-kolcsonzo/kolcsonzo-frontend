import React from 'react'

import FormElement from './component'
import FormErrorContext from '../context'

function WrappedFormElement({
  name,
  errors: explicitErrors = [],
  ...otherProps
}) {
  if (name) {
    return (
      <FormErrorContext.Consumer>
        {errors => (
          <FormElement
            errors={[
              ...explicitErrors,
              ...errors
                .filter(([field]) => field === name)
                .map(([, msg]) => msg),
            ]}
            {...otherProps}
          />
        )}
      </FormErrorContext.Consumer>
    )
  }

  return <FormElement errors={explicitErrors} {...otherProps} />
}

export default React.memo(WrappedFormElement)
