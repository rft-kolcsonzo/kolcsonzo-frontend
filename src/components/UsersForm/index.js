import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Map } from 'immutable'

import Form, {
  ValidatorFactory,
  FormElement,
  FormRow,
  FormButtonBar,
  JSONData,
} from '../Form'
import TextInput from '../TextInput'
import Button from '../Button'
import Checkbox from '../Checkbox'
import { APIContext } from '../../commons'
import { ValidationError } from '../../api/errors'

class UsersForm extends Component {
  static contextType = APIContext

  static propTypes = {
    user: PropTypes.instanceOf(Map),
    newUser: PropTypes.bool,
  }

  static defaultProps = {
    newUser: false,
  }

  state = {
    loading: false,
    errors: [],
  }

  validator = new ValidatorFactory()
    .field('firstname', 'lastname', 'email')
    .notEmpty('a mező kitöltése kötelező!')
    .field('email')
    .email('valós e-mail címet adj meg!')
    .custom(data => {
      if (!this.props.newUser || data.get('password').trim()) {
        return true
      }

      return ['password', 'jelszó megadása kötelező!']
    })
    .create()

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e) {
    const { user, history } = this.props
    const data = new JSONData(e.target)

    this.setState({ loading: true })
    e.preventDefault()

    try {
      await this.context.saveUser(user.get('user_id'), data)

      history.push('/-/users')
    } catch (err) {
      this.setState({ loading: false })

      if (err instanceof ValidationError) {
        this.setState({ errors: [[err.field, err.message]] })
        return
      }
      throw err
    }
  }

  render() {
    const { user } = this.props
    const { loading, errors } = this.state

    return (
      <Form
        errors={errors}
        onSubmit={this.handleSubmit}
        validator={this.validator}
      >
        <FormRow>
          <FormElement name="lastname" label="Vezetéknév">
            <TextInput name="lastname" defaultValue={user.get('lastname')} />
          </FormElement>
          <FormElement name="firstname" label="Keresztnév">
            <TextInput name="firstname" defaultValue={user.get('firstname')} />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="password" label="Jelszó">
            <TextInput type="password" name="password" />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="email" label="E-mail">
            <TextInput name="email" defaultValue={user.get('email')} />
          </FormElement>
        </FormRow>
        <div>
          <Checkbox
            name="is_admin"
            label="Admin jogosultság"
            defaultChecked={!!user.get('is_admin')}
          />
        </div>
        <FormButtonBar>
          <Button loading={loading} disabled={loading}>
            Mentés
          </Button>
        </FormButtonBar>
      </Form>
    )
  }
}

export default withRouter(UsersForm)
