import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';
import EventGenre from './EventGenre';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';


class App extends Component {
  state = {
    events: [],
    locations: [],
    eventNumber: 32,
    text: '',
    showWelcomeScreen: undefined,
    searchLocation: ''
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
        events: locationEvents,
        searchLocation: location
      });
    });
  }

  getData = () => {
    const {locations, events, eventNumber} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).slice(0, eventNumber).length
      const city = location.split(', ').shift()
      return {city,number};
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: (code || isTokenValid) });
    if (!(code || isTokenValid) && this.mounted) {
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
    const { locations, eventNumber, events } = this.state;
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

        <CitySearch locations={locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents updateEvents={this.updateEvents} searchLocation={this.state.searchLocation}/>
        
        <Card className='chart-card'>
        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke='white' />
              <XAxis type="category" dataKey="city" name="city" stroke='white' />
              <YAxis type="number" dataKey="number" name="number of events" stroke='white' />
              <Tooltip labelFormatter={() => { return ''; }} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#85B3D9" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className='chart-label'>Event Data</p>
        </div>
        </Card>

        <EventList events={events} eventNumber={eventNumber}/>

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
