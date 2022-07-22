import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

class NumberOfEvents extends Component {
    state = {
        eventNumber: 32,
        noeerror: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 33) {
            this.setState({noeerror: 'Enter a number between 1 and 32.'})
        } else {
            this.setState({eventNumber: value});
            this.props.updateEvents(undefined, value);
        }
    }

    render() {
        return(
            <div className='noe-container mx-auto'>
                <InputGroup>
                    <InputGroup.Text>Number of Events</InputGroup.Text>
                    <Form.Control type='text'
                    className='event-number-cap'
                    value={this.state.eventNumber}
                    onChange={this.handleInputChanged} />
                </InputGroup> 
                <div className='number-error'>{this.state.noeerror}</div>
            </div>
        )
    }
}

export default NumberOfEvents