import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
    render() {
        const { events, eventNumber } = this.props;
        return (
            <ul className='EventList'>
                {events.slice(0, eventNumber).map(event => 
                    <li key={event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
        )
    }
}

export default EventList;