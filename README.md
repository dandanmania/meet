# Meet App

This project is from [CareerFoundry's Full Stack Web Development Program](https://careerfoundry.com/en/courses/become-a-web-developer/) Achievement 4. It is a serverless, progressive web application made with React using a test-driven development (TDD) technique. It uses the Google Calendar API to fetch upcoming events, and display them and their details to the user.

Live Version: [Click Here](https://dandanmania.github.io/meet/).

Warning: The site is under verification with Google. You can still access it through the warning that pops up when trying to access the app.

# Uses

- React
- React Bootstrap
- Axios
- nprogress
- recharts
- serverless
- AWS Lambda
- Google OAuth2

# Set Up

1. Clone the repository
2. Run `npm install`
3. Start with `npm run start`

# Feature User Stories

## Feature 2: Show/Hide An Event's Details

As a user, I should be able to display and collapse an event and its details so that I can see or hide information of that event when I need it.

- Scenario 1: An event element is collapsed by default
  - Given the user just opened the app / main page
  - When the user has not selected an event
  - Then the event details are collapsed
- Scenario 2: User can expand an event to see its details
  - Given the user has picked an event
  - When the user clicks on the event
  - Then the event's details are expanded
- Scenario 3: User can collapse an event to hide its details
  - Given the user has finished reading the details
  - When the user clicks the event again / clicks out of the details
  - Then the event will collapse

## Feature 3: Specify Number of Events

As a user, I should be able to select how many events are displayed so that I can see as many events as I'd prefer at a given moment.

- Scenario 1: When user hasn't specified a number, 32 is the default number
  - Given the user hasn't specified a number
  - When the user opens the app / searches for events
  - Then 32 events are displayed
- Scenario 2: User can change the number of events they want to see
  - Given the user has specified a number of events
  - When the user opens the app / searches for events
  - Then only that number of events is displayed

## Feature 4: Use the App When Offline

As a user, I should be able to access cached events when I'm offline so that I can still see the event details even when I don't have internet.

- Scenario 1: Show cached data when there's no internet connection
  - Given there is no internet connection
  - When the user opens the app / searches for events
  - Then cached data will be displayed
- Scenario 2: Show error when user changes the settings (city, time range)
  - Given there's no internet connection
  - When the user tries to change the settings (city, time range)
  - Then an error is displayed

## Feature 5: Data Visualization

As a user, I should be able to see a chart with the number of upcoming events in every city so that I can see how busy/eventful a certain city will be.

- Scenario 1: Show a chart with the number of upcoming events in each city
  - Given the user opens the app / main page
  - When the main page loads
  - Then a chart with the number of upcoming events in each city is loaded
