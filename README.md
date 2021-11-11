# binge
Binge App

Inside the binge directory, you can run several commands:

- `npm run dev`
    Starts the development server.

- `npm run build`
    Builds the app for production.

- `npm start`
    Runs the built app in production mode.

Folder Structure:
- `__tests__`: contains test cases, which can be run using `npm run test`.
- `components`: contains the frontend components that make up our UI.
- `edamamAPI`: contains the API for interfacing with the Edamam API, which we use for retrieving food data. The code here contains everything from making the HTTP request to Edamam to parsing the JSON data into an object that the frontend can easily use.
- `lib`: TODO
- `pages`: contains a file for each page of our application, which each contain a functional React component.
- `prisma`: TODO
- `public`: some public assets such as images.
- `utils`: TODO
- `README.md`: the thing you are reading right now.

Description of Test Cases:

We use Jest and Enzyme for testing our application.
- `index.test.jsx`: tests the Home page render. This includes a snapshot test, tests for checking for components, and a test for the arrow button click.
- TODO