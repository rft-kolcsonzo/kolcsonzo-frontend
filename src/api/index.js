import {
  NotFoundError,
  UnauthorizedError,
  AuthenticationError,
  ValidationError,
} from './errors'
import queryString from 'query-string'

export default class API {
  baseUrl = null
  accessToken = null

  constructor({ baseUrl }) {
    if (!baseUrl || typeof baseUrl !== 'string') {
      throw new Error(`baseUrl must be a valid URL, provided: ${baseUrl}`)
    }

    if (typeof sessionStorage.accessToken === 'string') {
      this.accessToken = JSON.parse(sessionStorage.accessToken)
    }

    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  get isAuthenticated() {
    return this.accessToken != null
  }

  get isAdmin() {
    return this.isAuthenticated && this.accessToken.is_admin
  }

  fetch(path, init = {}) {
    const headers = new Headers(init.headers)
    let body

    if (init.body) {
      if (init.body instanceof FormData) {
        body = init.body
      } else {
        body = JSON.stringify(init.body)
        headers.set('content-type', 'application/json;charset=utf-8')
      }
    }

    return fetch(this.baseUrl + path, {
      ...init,
      headers,
      body,
    }).then(resp => this.handleErrors(resp))
  }

  signedFetch(path, init = {}) {
    const headers = new Headers(init.headers)

    if (!this.accessToken) {
      throw new UnauthorizedError('Authorization is required')
    }

    const { token, type } = this.accessToken
    headers.set('Authorization', `${type} ${token}`)

    return this.fetch(path, {
      ...init,
      headers,
    })
  }

  async handleErrors(orig) {
    if (!orig.ok) {
      const resp = orig.clone()
      const body = await orig.json()

      switch (resp.status) {
        case 404:
          throw new NotFoundError(
            body.message || 'Requested resource could not be found!'
          )
        case 401:
          throw new AuthenticationError(body.message)
        case 403:
          throw new UnauthorizedError(body.message)
        case 406:
          throw new ValidationError(body.field, body.message)
        default:
          throw new Error(body.message || 'General API error!')
      }
    }
    return orig
  }

  setToken(accessToken) {
    sessionStorage.accessToken = JSON.stringify(accessToken)
    this.accessToken = accessToken
  }

  async login(email, password) {
    try {
      const resp = await this.fetch(`/auth/token`, {
        method: 'POST',
        body: { email, password },
      })

      const body = await resp.json()

      this.setToken(body)
    } catch (e) {
      if (e instanceof NotFoundError) {
        return e
      }
      throw e
    }

    return true
  }

  async fetchUser(id) {
    const resp = await this.signedFetch(`/users/${id}`)

    return await resp.json()
  }

  async fetchUsers() {
    const resp = await this.signedFetch(`/users`)

    return await resp.json()
  }

  saveUser(id, body) {
    if (id) {
      return this.updateUser(id, body)
    }

    return this.createUser(body)
  }

  async updateUser(id, body) {
    const resp = await this.signedFetch(`/users/${id}`, {
      method: 'put',
      body,
    })

    return await resp.json()
  }

  async createUser(body) {
    const resp = await this.signedFetch(`/users`, {
      method: 'post',
      body,
    })

    return await resp.json()
  }

  async deleteUser(id) {
    const resp = await this.signedFetch(`/users/${id}`, {
      method: 'delete',
    })

    return resp.ok
  }

  async fetchCars(filter) {
    let query = ''
    if (filter) {
      query = '?' + queryString.stringify(filter)
    }
    const resp = await this.signedFetch(`/cars${query}`)

    return await resp.json()
  }

  saveCar(id, body) {
    if (id) {
      return this.updateCar(id, body)
    }

    return this.createCar(body)
  }

  async fetchCar(id) {
    const resp = await this.signedFetch(`/cars/${id}`)

    return await resp.json()
  }

  async updateCar(id, body) {
    const resp = await this.signedFetch(`/cars/${id}`, {
      method: 'put',
      body,
    })

    return await resp.json()
  }

  async createCar(body) {
    const resp = await this.signedFetch(`/cars`, {
      method: 'post',
      body,
    })

    return await resp.json()
  }

  async deleteCar(id) {
    const resp = await this.signedFetch(`/cars/${id}`, {
      method: 'delete',
    })

    return resp.ok
  }

  saveOrder(id, body) {
    if (id) {
      return this.updateOrder(id, body)
    }

    return this.createOrder(body)
  }

  async updateOrder(id, body) {
    const resp = await this.signedFetch(`/orders/${id}`, {
      method: 'put',
      body,
    })

    return resp.json()
  }

  async createOrder(body) {
    const resp = await this.signedFetch(`/orders`, {
      method: 'post',
      body,
    })

    return resp.json()
  }

  async fetchOrders() {
    const resp = await this.signedFetch('/orders')

    return await resp.json()
  }

  async fetchOrder(id) {
    const resp = await this.signedFetch(`/orders/${id}`)

    return await resp.json()
  }

  urlForOrderPdf(id) {
    if (!this.accessToken) {
      throw new UnauthorizedError('Authorization is required')
    }

    const query = queryString.stringify({
      access_token: this.accessToken.token,
    })

    return `${this.baseUrl}/orders/${id}/pdf?${query}`
  }

  // async fetchCar() {
  //   return cars.last()
  // }

  // async fetchCars() {
  //   return cars
  // }
}
