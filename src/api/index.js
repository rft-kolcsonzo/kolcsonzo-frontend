import Immutable from 'immutable'

const cars = Immutable.fromJS([
  {
    car_id: 1,
    plate_number: 'PIY-936',
    modell: '320i (E46)',
    type: 'BMW',
    factory_id: 'WBABE7325VKK53716',
    persons: 5,
    doors_number: 4,
    category: 'személyautó',
    tags: '',
    color: 'ezüst',
    born_date: '2004-01-02',
    insurance_name: 'Allianz',
    insurance_id: '10547658',
    insurance_until_date: '2019-09-10',
    is_valid_insurance: true,
    car_status_details: '',
    available_status: 1,
  },
])

const users = Immutable.fromJS([
  {
    user_id: 1,
    email: 'teszt@teszt.hu',
    firstname: 'john',
    lastname: 'snow',
    profile_img: null,
    is_admin: 1,
    enabled_status: 1,
    deleted: 0,
  },
])

export default class API {
  async fetchUser() {
    return users.last()
  }

  async fetchUsers() {
    return users
  }

  async fetchCar() {
    return cars.last()
  }

  async fetchCars() {
    return cars
  }
}
