import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the user has not selected an event', () => {

        });
        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the event details are collapsed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let EventWrapper;
        given('the user has picked an event', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        when('the user clicks on the event details button', () => {
            EventWrapper.find('.details-toggle').simulate('click');
        });

        then('the event\'s details are expanded', () => {
            expect(EventWrapper.find('.details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let EventWrapper;
        given('the user has finished reading the details (the details are expanded)', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            EventWrapper.find('.details-toggle').simulate('click');
            expect(EventWrapper.find('.details')).toHaveLength(1);
        });

        when('the user clicks the event details button', () => {
            EventWrapper.find('.details-toggle').simulate('click');
        });

        then('the event details will collapse', () => {
            expect(EventWrapper.find('.details')).toHaveLength(0);
        });
    });
});