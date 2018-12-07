import { createContext } from 'react'
import API from '../api'

export const APIContext = createContext(null)

export const configureAPI = options => new API(options)
