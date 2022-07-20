Feature: Show/Hide An Event's Details

    Scenario: An event element is collapsed by default
        Given the user has not selected an event
        When the user opens the app
        Then the event details are collapsed

    Scenario: User can expand an event to see its details
        Given the user has picked an event
        When the user clicks on the event details button
        Then the event's details are expanded

    Scenario: User can collapse an event to hide its details
        Given the user has finished reading the details (the details are expanded)
        When the user clicks the event details button
        Then the event details will collapse