import React, { Component } from 'react'
// import {observer} from 'mobx-react'
import Challenge from './components/Challenge'
import History from './components/History'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
  }
  onStart() {
    this.props.store.start()
  }
  render() {
    const {store} = this.props
    console.log('Render!', store)
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="">Mental Arithmetic</h2>
        </div>
        <section className="section">
          <div className="container">
            {store.challenge && (
              <Challenge
                challenge={store.challenge}
                onSelectAnswer={store.selectAnwser}
                onGoNext={store.goNext}
              />
            )}
            {store.history.challenges.length > 0 && (
              <History history={store.history} />
            )}
            {store.status === 'initial' && (
              <Start onStart={this.onStart} />
            )}
          </div>
        </section>
      </div>
    )
  }
}

const Start = ({ onStart }) => (
  <div className="box">
    <p>Goal: answer as quickly as possible to the questions!</p>
    <p style={{ marginTop: '1rem' }}>
      <button className="button is-primary is-outlined" onClick={onStart}>START</button>
    </p>
  </div>
)

export default App
