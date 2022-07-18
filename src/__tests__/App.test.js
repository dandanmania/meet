import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from '../EventList';
import CitySearch from '../CitySearch';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';
import NumberOfEvents from "../NumberOfEvents";

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    })

    test('render lists of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    })

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    })

    test('render NumberOfEvents', () => {
        
    })
});

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    })

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    })

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    })

    test('get list of all events when user selects "See all cities', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    })

    test('default load of events', async () => {
        const AppWrapper = mount(<App />);
        const allEvents = await getEvents();
        const eventNumber = AppWrapper.state('eventNumber');
        expect(eventNumber).not.toEqual(undefined);
        expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, eventNumber));
        console.log(eventNumber)
        AppWrapper.unmount();
    })

    test('NOE change passes through to App eventNumber state', () => {
        const AppWrapper = mount(<App />);
        const NOEWrapper = AppWrapper.find(NumberOfEvents);
        const eventNumber = NOEWrapper.state('eventNumber');
        expect(eventNumber).not.toEqual(undefined);
        const randomEventNumber = Math.floor((Math.random() * 31) + 1);
        NOEWrapper.find('.event-number-cap').simulate('change', {
            target: { value: randomEventNumber }
        })
        expect(AppWrapper.state('eventNumber')).toBe(randomEventNumber);
        AppWrapper.unmount();
    })

    test('App passes "eventNumber" state to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventNumberState = AppWrapper.state('eventNumber');
        expect(AppEventNumberState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().eventNumber).toEqual(AppEventNumberState);
        AppWrapper.unmount();
    })

    test('EventList caps the amount of events based on NumberOfEvents', async () => {
        const AppWrapper = mount(<App />);
        const EventListWrapper = AppWrapper.find(EventList);
        const NOEWrapper = AppWrapper.find(NumberOfEvents);
        const loadEvents = await getEvents();
        NOEWrapper.find('.event-number-cap').simulate('change', {
            target: { value: 1 }
        })
        expect(AppWrapper.state('eventNumber')).toBe(1);
        expect(AppWrapper.find(EventList).props().events).toEqual(loadEvents);
        AppWrapper.unmount();
    })
});