import React, {Component} from 'react'
import PropTypes from 'prop-types'


class ChatInput extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: ''
		}
	}

	static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
    activationTrigger: PropTypes.bool.isRequired,
  	}

	render() {
		return (
			<form
				action='sendsomemessage'
				onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
			>
				<div className="inputs-line"> 
					<input 
						type='text'
						placeholder='Enter your message'
						value={this.state.message}
						onChange={e => this.setState({ message: e.target.value })} 
						disabled={(this.props.activationTrigger)? "" : "disabled"}
					/>
					<input 
						type='submit'
						value='Send'
						disabled={(this.props.activationTrigger)? "" : "disabled"} 
					/>
				</div>
			</form> 
		)
	}
}



export default ChatInput