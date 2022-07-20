Feature: Specify Number of Events
    Scenario: When user hasn't specified a number, 32 is the default number
        Given the user hasn't specified a number
        When the user opens the app
        Then 32 events are displayed

    Scenario: User can change the number of events they want to see
        Given the user has specified a number of events
        When the user searches for events
        Then only that number of events is displayed
