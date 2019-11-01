import React, {Component} from 'react'

class ChatMessage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="chat-message">
		    	<strong>{this.props.userStatus}</strong> <em>{this.props.message}</em>
			</div>
		)
	}
}



export default ChatMessage