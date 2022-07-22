import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';


class Event extends Component {
    state = {
        hidden: true,
        buttonLabel: 'Show Details'
    }

    detailsClicked = (state) => {
        this.setState( { hidden: !state.hidden, buttonLabel: this.state.hidden ? "Hide Details" : "Show Details" } )
    }

    render() {
        const { event } = this.props;
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        const startDate = new Date(event.start.dateTime);
        const endDate = new Date(event.end.dateTime);

        return (
            <Container className='event'>
                <p className='title'>{event.summary}</p>
                <p className='time'>{startDate.toLocaleTimeString('en-US', dateOptions)} - {endDate.toLocaleTimeString('en-US', dateOptions)}</p>
                <p className='location'>{event.location}</p>
                {this.state.hidden ? null : (<p className='details'>{event.description}</p>)}
                <Button variant="primary" className='mt-3 mb-1 details-toggle' onClick= {() => this.detailsClicked(this.state)}>{this.state.buttonLabel}</Button>
            </Container>
        );
    }
}

export default Event;