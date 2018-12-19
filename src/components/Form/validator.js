const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class ValidatorFactory {
  validators = []

  get current() {
    if (!this._current) {
      throw new Error(
        'You have to select a field before adding rules to it with field(name)'
      )
    }
    return this._current
  }

  set current(value) {
    if (value) {
      if (Array.isArray(value)) {
        this._current = [...value]
      } else {
        this._current = [value]
      }
      return
    }

    this._current = null
  }

  field(...names) {
    this.current = names

    return this
  }

  notEmpty(message) {
    const fields = this.current

    fields.forEach(name =>
      this.validators.push(data => {
        const value = data.get(name)

        if (typeof value === 'string' && value.trim().length > 0) {
          return true
        }

        return [name, message || `${name} cannot be empty!`]
      })
    )

    return this
  }

  email(message) {
    this.current.forEach(name =>
      this.validators.push(data => {
        const value = data.get(name)

        if (typeof value === 'string' && emailRegExp.test(value)) {
          return true
        }

        return [name, message || `${name} must be a valid e-mail address!`]
      })
    )

    return this
  }

  regex(regex, message) {
    this.current.forEach(name =>
      this.validators.push(data => {
        const value = data.get(name)

        if (typeof value === 'string' && regex.test(value)) {
          return true
        }

        return [name, message || `${name} must match pattern '${regex}'!`]
      })
    )

    return this
  }

  custom(validator) {
    this.field = null

    if (typeof validator !== 'function') {
      throw new Error('Custom validator must be a function')
    }

    this.validators.push(validator)

    return this
  }

  create() {
    const validators = [...this.validators]

    this.reset()

    return data =>
      validators
        .map(validator => {
          const result = validator(data)

          if (result === true) {
            return false
          }

          return result
        })
        .filter(result => result)
  }

  reset() {
    this.current = null
    this.validators = []
  }
}
