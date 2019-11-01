import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

class Chat extends Component {
	constructor(props){
		super(props)
		this.state = {
      ws: null,
      wsString: '',
			messages: [],
      alertMessage: '',
      connectionState: false,
      filter: '',
		}
	}

  inputWebSocketAddress = event => {
    this.setState({wsString: event.target.value})
  }

  setWebSocket = event => {
    event.preventDefault();
    if (this.state.ws !== null){
        this.state.ws.close()
    }
    
    if (/(?:ws(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.state.wsString)) {
      var ws = new WebSocket(this.state.wsString);
      this.setCallbacksOnWS(ws);
      this.setState({ws: ws});
      this.setState({alertMessage: "Connecting ........."})
    }
    else {
      this.setState({alertMessage: "Wrong format ex: ws://lala.com"})
    }
  }

  setCallbacksOnWS = ws => {
    if (ws !== undefined){
      ws.onopen = () => {
        this.setState({connectionState: true, alertMessage: ''})
        console.log('connected')
      }

      ws.onmessage = event => {
        const message = event.data
        this.addMessage({userStatus: "RECIEVED: ", message: message})
      }

      ws.onclose = () => {
        console.log('disconnected')
        this.setState({connectionState: false})
      }
    }
  }


  addMessage = message => {
  	this.setState(state => ({messages: [message, ...state.messages]}))
  }

  sendMessage = messageString => {
  	if (messageString !== '') {
  		this.state.ws.send(messageString)
	    this.addMessage({userStatus: "SENDED: ", message: messageString})
	  } else {
  		console.log('The message is empty')
  	}
  }


  render() {
    return (
      <div>
        <div className={(this.state.connectionState)? "main-window-green": "main-window-red"} > 
          <form onSubmit={this.setWebSocket}>
          <div className="inputs-line">
            <input className="web-socket-input"
              type="text"
              placeholder="WebSocket Address..."
              onChange = {this.inputWebSocketAddress}
            />
            <input className="web-socket-button"
              type="submit"
              value={(this.state.ws === null)? "Set WS" : "Change WS"}
            /> 
          </div>
          </form>

          <div>{this.state.alertMessage} {(this.state.connectionState)? "connected!" : ""} &nbsp;</div>

          <ChatInput
              activationTrigger={this.state.connectionState}
              onSubmitMessage={messageString => {this.sendMessage(messageString)}} 
          />

          <input className ="clear-chat-button"
            type="submit"
            onClick={e => this.setState({messages: []})}
            value="Clear Chat"
            disabled = {(this.state.messages.length === 0)? "disbled" : ""}
            />
        </div> 
        {this.state.messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            userStatus={message.userStatus}
          />,
          )}
      </div>
    )
  }
}

export default Chat