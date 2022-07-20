import React, { Component } from 'react';


class Event extends Component {
    state = {
        hidden: true,
        buttonLabel: 'Show Details'
    }

    detailsClicked = (state) => {
        this.setState( { hidden: !state.hidden, buttonLabel: this.state.hidden ? "Hide Details" : "Show Details" } )
    }

    render() {
        const { event } = this.props
        return (
            <div className='event'>
                <p className='title'>{event.summary}</p>
                <p className='time'>{event.start.dateTime} - {event.end.dateTime}</p>
                <p className='location'>{event.location}</p>
                {this.state.hidden ? null : (<p className='details'>{event.description}</p>)}
                <button className='details-toggle' onClick= {() => this.detailsClicked(this.state)}>{this.state.buttonLabel}</button>
            </div>
        );
    }
}

export default Event;