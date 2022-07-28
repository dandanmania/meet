import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventNumber: 32,
    text: '',
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if(!navigator.onLine) {
      this.setState({ text: 'You\'re now offline! Reconnect to get the latest! '})
    } else {
      this.setState({ text: '' })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />;

    return (
      <div className="App">
        <div className="topbar">
          <svg className="MainLogo" height="100px" width="405px">
            <path 
              d="m 20 -20 l -52 326 l 365 3 l 58 -329"
              fill="#85B3D9"
              />
            <text x="195"
                  y="55"
                  fill="#FFFFFF"
                  text-anchor="middle"
                  alignment-baseline="middle"
                  className='LogoText'>
                  Meet App
              </text>
          </svg>
        </div>
        <WarningAlert text={this.state.text}/>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} eventNumber={this.state.eventNumber}/>

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
