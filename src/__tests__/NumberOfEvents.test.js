import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEventNumber={() => {}}/>);
    })

    test('render text container', () => {
        expect(NumberOfEventsWrapper.find('.noe-container')).toHaveLength(1);
    })

    test('check default number', () => {
        expect(NumberOfEventsWrapper.state('eventNumber')).toBe(32);
    })

    test('check number change upon input', () => {
        NumberOfEventsWrapper.setState({ eventNumber: 32 });
        NumberOfEventsWrapper.find('.event-number-cap').simulate('change', {
            target: { value: 18 }
        })
        expect(NumberOfEventsWrapper.state('eventNumber')).toBe(18);
    })

    test('check negative number (and zero) error message', () => {
        NumberOfEventsWrapper.setState({ eventNumber: 32 });
        NumberOfEventsWrapper.find('.event-number-cap').simulate('change', {
            target: { value: -1 }
        })
        expect(NumberOfEventsWrapper.state('noeerror')).toBe('Enter a number between 1 and 32.');
        NumberOfEventsWrapper.find('.event-number-cap').simulate('change', {
            target: { value: 0 }
        })
        expect(NumberOfEventsWrapper.state('noeerror')).toBe('Enter a number between 1 and 32.');
    })

    test('check large number error message', () => {
        NumberOfEventsWrapper.find('.event-number-cap').simulate('change', {
            target: { value: 33 }
        })
        expect(NumberOfEventsWrapper.state('noeerror')).toBe('Enter a number between 1 and 32.');
    })
})