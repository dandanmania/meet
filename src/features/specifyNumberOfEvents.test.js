import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user hasn\'t specified a number', () => {

        });
        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('32 events are displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(2); // Mock Data only has 2 events
            expect(AppWrapper.state('eventNumber')).toBe(32); // Check state for the limit
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper, NumberOfEventsWrapper;
        given('the user has specified a number of events', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.find('.event-number-cap').simulate('change', {
                target: { value: 1 }
            })
        });

        when('the user searches for events', () => {
            AppWrapper.update();
        });

        then('only that number of events is displayed', () => {
            expect(AppWrapper.find('.EventList li')).toHaveLength(1);
        });
    });
});