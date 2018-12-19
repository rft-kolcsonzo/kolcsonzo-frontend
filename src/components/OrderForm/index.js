import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Map, List } from 'immutable'

import Form, {
  ValidatorFactory,
  FormElement,
  FormRow,
  FormButtonBar,
  JSONData,
} from '../Form'
import TextInput from '../TextInput'
import Button from '../Button'
import { APIContext } from '../../commons'
import { ValidationError } from '../../api/errors'
import DropDown, { Value } from '../DropDown'
import './style.scss'
import { dayDiff, dashedDate } from '../Date'

class OrderForm extends Component {
  static contextType = APIContext

  static propTypes = {
    order: PropTypes.instanceOf(Map).isRequired,
    cars: PropTypes.instanceOf(List).isRequired,
    isNew: PropTypes.bool,
  }

  static defaultProps = {
    isNew: false,
    cars: List(),
  }

  validator = new ValidatorFactory()
    .field(
      'car_id',
      'start_date',
      'starting_km',
      'firstname',
      'lastname',
      'email',
      'phone',
      'address',
      'birthdate'
    )
    .notEmpty('a mező kitöltése kötelező!')
    .field('start_date', 'birthdate')
    .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, 'valós dátumnak kell lennie!')
    .field('end_date')
    .regex(/^(\d{4}-\d{1,2}-\d{1,2})?$/, 'valós dátumnak kell lennie!')
    .field('email')
    .email('valós e-mail címet adj meg!')
    .custom(data => {
      if (this.state.activeRent) {
        return true
      }

      const value = parseFloat(data.get('last_km'))
      const startingKm = parseFloat(data.get('starting_km'))
      if (value < startingKm) {
        return ['last_km', 'nagyobbnak kell lennie mint a kezdő állásnak!']
      }

      return true
    })
    .create()

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRentStatusChange = this.handleRentStatusChange.bind(this)
    this.handleCarChange = this.handleCarChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handlePricingChange = this.handlePricingChange.bind(this)

    const { order, cars } = this.props
    const startDate = new Date(order.get('start_date', new Date()))
    const endDate = order.get('end_date')
      ? new Date(order.get('end_date'))
      : null
    const duration =
      endDate && !isNaN(endDate) ? dayDiff(endDate, startDate) : 0

    this.state = {
      loading: false,
      errors: [],
      car: order.get('car_id')
        ? cars.filter(car => car.get('car_id') === order.get('car_id')).last()
        : null,
      activeRent: !!order.get('rent_status', 1),
      startDate,
      endDate,
      duration,
      total: order.get('rent_total', 0),
      dailyPrice: order.get('daily_rent_price', 0),
      fixingCost: order.get('fixing_price', 0),
      subtotal: order.get('rent_subtotal', 0),
      vat: order.get('vat', 0),
    }
  }

  componentDidMount() {
    this.calculatePricing()
  }

  async handleSubmit(e) {
    const { order, history } = this.props
    const data = new JSONData(e.target)

    this.setState({ loading: true })
    e.preventDefault()

    try {
      await this.context.saveOrder(order.get('rent_id'), data)

      history.push('/-/orders')
    } catch (err) {
      this.setState({ loading: false })

      if (err instanceof ValidationError) {
        this.setState({ errors: [[err.field, err.message]] })
        return
      }
      throw err
    }
  }

  handleDurationChange(e) {
    let { startDate, endDate, duration, errors } = this.state

    if (e.target.name === 'start_date') {
      startDate = new Date(e.target.value)
    } else if (e.target.name === 'end_date') {
      endDate = new Date(e.target.value)
    }

    if (
      startDate instanceof Date &&
      endDate instanceof Date &&
      !isNaN(startDate) &&
      !isNaN(endDate)
    ) {
      duration = dayDiff(endDate, startDate)

      if (duration < 0) {
        this.setState({
          errors: [
            ...errors,
            ['end_date', 'nem lehet korábbi időpont mint a kezdő dátum!'],
          ],
        })
        duration = 0
      } else {
        this.setState({
          errors: errors.filter(([field]) => field !== 'end_date'),
        })
      }
    } else {
      duration = 0
    }

    if (isNaN(duration)) {
      duration = 0
    }

    this.setState({ startDate, endDate, duration }, () =>
      this.calculatePricing()
    )
  }

  handlePricingChange(e) {
    let { dailyPrice, fixingCost } = this.state

    if (e.target.name === 'daily_rent_price') {
      dailyPrice = parseInt(e.target.value, 10)
    } else if (e.target.name === 'fixing_price') {
      fixingCost = parseInt(e.target.value, 10)
    }

    this.setState({ dailyPrice, fixingCost }, () => this.calculatePricing())
  }

  calculatePricing() {
    const { duration, dailyPrice, fixingCost } = this.state
    const total = duration * dailyPrice + fixingCost

    this.setState({
      total,
      subtotal: Math.round(total * 0.63),
      vat: Math.round(total * 0.27),
    })
  }

  handleRentStatusChange(e) {
    this.setState({ activeRent: e.target.value === '1' })
  }

  handleCarChange(e) {
    this.setState({
      car: this.props.cars
        .filter(car => car.get('car_id') === parseInt(e.target.value, 10))
        .last(),
    })
  }

  render() {
    const { order, cars } = this.props
    const {
      loading,
      errors,
      activeRent,
      car,
      total,
      subtotal,
      vat,
      duration,
    } = this.state

    return (
      <Form
        errors={errors}
        onSubmit={this.handleSubmit}
        validator={this.validator}
        className="order-form"
      >
        <FormRow>
          <FormElement name="rent_status" label="Állapot">
            <DropDown
              name="rent_status"
              onChange={this.handleRentStatusChange}
              defaultValue={order.get('rent_status', 1)}
            >
              <Value value={1}>Aktív</Value>
              <Value value={0}>Lezárt</Value>
            </DropDown>
          </FormElement>
        </FormRow>

        <h2>Bérlendő jármű</h2>
        <FormRow>
          <FormElement name="car_id" label="Bérlendő jármű">
            <DropDown
              name="car_id"
              onChange={this.handleCarChange}
              defaultValue={cars.size > 0 ? order.get('car_id') : undefined}
            >
              <Value value={''}>Kérlek válassz</Value>
              {cars.map(car => (
                <Value key={car.get('car_id')} value={car.get('car_id')}>
                  {car.get('plate_number')}
                </Value>
              ))}
            </DropDown>
          </FormElement>
          {car && (
            <>
              <FormElement label="Gyártmány">
                <label>{car.get('type')}</label>
              </FormElement>
              <FormElement label="Model">
                <label>{car.get('modell')}</label>
              </FormElement>
              <FormElement label="Alvázszám">
                <label>{car.get('factory_id')}</label>
              </FormElement>
              <FormElement label="Szín">
                <label>{car.get('color')}</label>
              </FormElement>
            </>
          )}
        </FormRow>
        <FormRow>
          <FormElement name="start_date" label="Bérlés kezdete">
            <TextInput
              name="start_date"
              mask="9999-99-99"
              defaultValue={order.get('start_date', dashedDate(new Date()))}
              placeholder="yyyy-mm-dd"
              onChange={this.handleDurationChange}
            />
          </FormElement>
          <FormElement name="end_date" label="Bérlés vége">
            <TextInput
              name="end_date"
              mask="9999-99-99"
              defaultValue={order.get('end_date')}
              placeholder="yyyy-mm-dd"
              onChange={this.handleDurationChange}
            />
          </FormElement>
          <FormElement name="starting_km" label="Kezdő kilóméter">
            <TextInput
              name="starting_km"
              type="number"
              defaultValue={order.get('starting_km')}
            />
          </FormElement>
          <FormElement name="last_km" label="Befejező kilóméter">
            <TextInput
              type="number"
              disabled={activeRent}
              name="last_km"
              defaultValue={order.get('last_km')}
            />
          </FormElement>
        </FormRow>
        <FormRow />

        <h2>Bérlő adatai</h2>
        <FormRow>
          <FormElement name="lastname" label="Vezetéknév">
            <TextInput name="lastname" defaultValue={order.get('lastname')} />
          </FormElement>
          <FormElement name="firstname" label="Keresztnév">
            <TextInput name="firstname" defaultValue={order.get('firstname')} />
          </FormElement>
          <FormElement name="birthdate" label="Születési dátum">
            <TextInput
              name="birthdate"
              mask="9999-99-99"
              defaultValue={order.get('birthdate')}
              placeholder="yyyy-mm-dd"
            />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement name="email" label="E-mail">
            <TextInput name="email" defaultValue={order.get('email')} />
          </FormElement>
          <FormElement name="phone" label="Telefon">
            <TextInput name="phone" defaultValue={order.get('phone')} />
          </FormElement>
          <FormElement name="address" label="Lakcím">
            <TextInput name="address" defaultValue={order.get('address')} />
          </FormElement>
        </FormRow>

        <h2>Díjszabás</h2>
        <FormRow>
          <FormElement name="daily_rent_price" label="Napi díj">
            <TextInput
              type="number"
              name="daily_rent_price"
              onChange={this.handlePricingChange}
              defaultValue={order.get('daily_rent_price')}
            />
          </FormElement>
          <FormElement name="deposit" label="Kaució">
            <TextInput
              type="number"
              name="deposit"
              defaultValue={order.get('deposit')}
            />
          </FormElement>
          <FormElement name="fixing_price" label="Javítás díja">
            <TextInput
              type="number"
              name="fixing_price"
              disabled={activeRent}
              defaultValue={order.get('fixing_price')}
            />
          </FormElement>
        </FormRow>
        <FormRow>
          <FormElement label="Napok száma">
            <label>{duration} db</label>
          </FormElement>
          <FormElement label="Végösszeg">
            <label>{total} Ft</label>
            <input type="hidden" name="vat" value={vat} />
            <input type="hidden" name="rent_subtotal" value={subtotal} />
            <input type="hidden" name="rent_total" value={total} />
          </FormElement>
        </FormRow>
        <FormButtonBar>
          <Button loading={loading} disabled={loading}>
            Mentés
          </Button>
        </FormButtonBar>
      </Form>
    )
  }
}

export default withRouter(OrderForm)
