import React, { Component } from 'react';

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
            this.setState({eventNumber: value})
        }
    }

    render() {
        return(
            <div className='noe-container'>
                <input 
                    type='text'
                    className='event-number-cap'
                    value={this.state.eventNumber}
                    onChange={this.handleInputChanged}
                />
                <div className='number-error'>{this.state.noeerror}</div>
            </div>
        )
    }
}

export default NumberOfEvents