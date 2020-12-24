import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './styles.css'
import store, { getAccess, getStreets, setSaved } from './store'
import { Provider as StoreProvider } from 'react-redux'


store.dispatch(setSaved(JSON.parse(localStorage.getItem('svd'))))

store.dispatch(getAccess())
store.dispatch(getStreets())

ReactDOM.render(<StoreProvider store={store}><App /></StoreProvider>, document.getElementById('app'))
