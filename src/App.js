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
    eventNumber: 32
  }

  updateEvents = (location, eventNumber) => {
    if (eventNumber === undefined) {
      this.setState({ eventNumber: this.state.eventNumber })
    } else (
      this.setState({ eventNumber: eventNumber })
    )
    if(location === undefined) { location = 'all' }
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
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
        <div className="topbar">
          <svg className="MainLogo" height="100px" width="405px">
            <a href="/">
            <path 
              d="m 28 -20 l -52 326 l 365 3 l 58 -329"
              fill="#85B3D9"
              className='hovercolor'/>
            <text x="195"
                  y="55"
                  fill="#FFFFFF"
                  text-anchor="middle"
                  alignment-baseline="middle"
                  className='LogoText'>
                  Meet App
              </text>
            </a>
          </svg>
        </div>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} eventNumber={this.state.eventNumber}/>
      </div>
    );
  }
}

export default App;
