import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe ('<Event /> Component', () => {
    let EventWrapper
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]}/>);
    })

    test('Verify event title rendered', () => {
        expect(EventWrapper.find('.title')).toHaveLength(1);
    })

    test('Verify event date/time rendered', () => {
        expect(EventWrapper.find('.time')).toHaveLength(1);
    })

    test('Verify event location rendered', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    })

    test('Verify event details button rendered', () => {
        expect(EventWrapper.find('.details-toggle')).toHaveLength(1);
    })

    test('Show extra info when user clicks on a Details button when hidden', () => {
        EventWrapper.setState({
            hidden: true
        });
        EventWrapper.find('.details-toggle').simulate('click');
        expect(EventWrapper.state('hidden')).toBe(false);
        expect(EventWrapper.find('.details')).toHaveLength(1);
    })

    test('Hide extra info when user clicks on a Details button when shown', () => {
        EventWrapper.setState({
            hidden: false
        });
        EventWrapper.find('.details-toggle').simulate('click');
        expect(EventWrapper.state('hidden')).toBe(true);
        expect(EventWrapper.find('.details')).toHaveLength(0);
    })
})