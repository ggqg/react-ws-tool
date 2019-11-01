import React, {Component} from 'react'


class SocketInput extends Component { 
	constructor(props){
		super(props);
	}


	render() { 
		return (
			<form onSubmit={this.props.onSubmitSocket}>
              <input className="web-socket-input"
                type="text"
                placeholder="WebSocket Address..."
                onChange = {this.props.inputWebSocketAddress}
              />
              <input className="web-socket-button"
                type="submit"
                value={(this.state.ws === null)? "Set WS" : "Change WS"}
              />  
            </form>
		)
	}
}
export default SocketInput