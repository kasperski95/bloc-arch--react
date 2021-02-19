import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BlocProvider } from './blocs/setup-blocs'

ReactDOM.render(
  <React.StrictMode>
    <BlocProvider>
      <App />
    </BlocProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
