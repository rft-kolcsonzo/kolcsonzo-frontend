import React from 'react'
import ReactDOM from 'react-dom'
import App from '.'
import { StaticRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <StaticRouter location="/" context={{}}>
      <App />
    </StaticRouter>,
    div
  )

  ReactDOM.unmountComponentAtNode(div)
})
