import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        eventNumber: 32,
        noeerror: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 33) {
            this.setState({infoText: 'Enter a number between 1 and 32.'})
        } else {
            this.setState({eventNumber: value, infoText: ''});
            this.props.updateEvents(undefined, value);
        }
    }

    render() {
        return(
            <>
                <div className='noe-container pb-2 mx-auto'>
                    <InputGroup>
                        <InputGroup.Text>Number of Events</InputGroup.Text>
                        <Form.Control type='text'
                        className='event-number-cap'
                        value={this.state.eventNumber}
                        onChange={this.handleInputChanged} />
                    </InputGroup>
                    <ErrorAlert text={this.state.infoText}/> 
                </div>
            </>
        )
    }
}

export default NumberOfEvents