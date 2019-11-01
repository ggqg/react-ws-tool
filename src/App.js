import React, { Component } from 'react'
import './App.css'
import Chat from './Chat'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> WebSocket Connecting Tool </h1>
        <Chat />
      </div>
    )
  }
}

export default App
