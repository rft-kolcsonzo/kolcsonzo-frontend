import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import Form, {
  ValidatorFactory,
  FormElement,
  FormRow,
  FormButtonBar,
} from '../Form'
import TextInput from '../TextInput'
import Button from '../Button'
import Checkbox from '../Checkbox'

export default class UsersForm extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
  }

  state = {
    errors: [],
  }

  form = React.createRef()

  validator = new ValidatorFactory()
    .field('firstname', 'lastname', 'email')
    .notEmpty()
    .field('email')
    .email()
    .create()

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    console.log('SUCCESS')
  }

  render() {
    const { user } = this.props

    return (
      <Form onSubmit={this.handleSubmit} validator={this.validator}>
        <FormRow>
          <FormElement name="lastname" label="Vezetéknév">
            <TextInput name="lastname" defaultValue={user.get('lastname')} />
          </FormElement>
          <FormElement name="firstname" label="Keresztnév">
            <TextInput name="firstname" defaultValue={user.get('firstname')} />
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
          <Button>Mentés</Button>
        </FormButtonBar>
      </Form>
    )
  }
}
