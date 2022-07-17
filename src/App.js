import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventNumber: 30
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? 
        events:
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  updateEventNumber = (eventNumber) => {
    this.setState({ eventNumber: eventNumber })
  }

  componentDidMount() {
    getEvents().then((events) => {
      this.setState({ events, locations: extractLocations(events) });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents updateEventNumber={this.updateEventNumber}/>
        <EventList events={this.state.events} eventNumber={this.state.eventNumber}/>
      </div>
    );
  }
}

export default App;
