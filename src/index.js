import React from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './lib/store'
import './index.css'

const ConnectedApp = observer(App)

ReactDOM.render(<ConnectedApp store={store} />, document.getElementById('root'))
registerServiceWorker()
