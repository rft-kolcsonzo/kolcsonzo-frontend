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
import DropDown, { Value } from '../DropDown'

export default class CarsForm extends Component {
  static propTypes = {
    car: PropTypes.instanceOf(Map),
  }

  state = {
    errors: [],
  }

  form = React.createRef()

  validator = new ValidatorFactory()
    .field(
      'plate_number',
      'modell',
      'type',
      'category',
      'factory_id',
      'persons',
      'doors_number',
      'color',
      'born_date'
    )
    .notEmpty('a mező kitöltése kötelező!')
    .field('born_date', 'insurance_until_date')
    .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, 'valós dátumnak kell lennie!')
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
    const { car } = this.props

    return (
      <Form onSubmit={this.handleSubmit} validator={this.validator}>
        <FormRow>
          <FormElement name="plate_number" label="Rendszám">
            <TextInput
              name="plate_number"
              defaultValue={car.get('plate_number')}
            />
          </FormElement>
          <FormElement name="modell" label="Model">
            <TextInput name="modell" defaultValue={car.get('modell')} />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="type" label="Gyártó">
            <TextInput name="type" defaultValue={car.get('type')} />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="factory_id" label="Alvázszám">
            <TextInput name="factory_id" defaultValue={car.get('factory_id')} />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="persons" label="Szállítható személyek száma">
            <TextInput name="persons" defaultValue={car.get('persons')} />
          </FormElement>
          <FormElement name="doors_number" label="Ajtók száma">
            <DropDown
              name="doors_number"
              defaultValue={car.get('doors_number')}
            >
              <Value value={3}>3</Value>
              <Value value={4}>4</Value>
              <Value value={5}>5</Value>
            </DropDown>
          </FormElement>
          <FormElement name="category" label="Típus">
            <DropDown name="category" defaultValue={car.get('category')}>
              <Value value="personal">személyautó</Value>
              <Value value="commercial">haszonjármű</Value>
            </DropDown>
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="color" label="Szín">
            <TextInput name="color" defaultValue={car.get('color')} />
          </FormElement>
          <FormElement name="born_date" label="Gyártás dátuma">
            <TextInput name="born_date" defaultValue={car.get('born_date')} />
          </FormElement>
          <FormElement name="insurance_name" label="Biztosító neve">
            <TextInput
              name="insurance_name"
              defaultValue={car.get('insurance_name')}
            />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="insurance_id" label="Biztosítás sz. száma">
            <TextInput
              name="insurance_id"
              defaultValue={car.get('insurance_id')}
            />
          </FormElement>
          <FormElement
            name="insurance_until_date"
            label="Biztosítás érvényessége"
          >
            <TextInput
              name="insurance_until_date"
              defaultValue={car.get('insurance_until_date')}
            />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="car_status_details" label="Állapot">
            <TextInput
              name="car_status_details"
              multiline
              defaultValue={car.get('car_status_details')}
            />
          </FormElement>
        </FormRow>
        <div>
          <Checkbox
            name="available_status"
            label="Bérelhető"
            defaultChecked={!!car.get('available_status')}
          />
        </div>
        <FormButtonBar>
          <Button>Mentés</Button>
        </FormButtonBar>
      </Form>
    )
  }
}
