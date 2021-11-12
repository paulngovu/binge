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
- `lib`: contains a file for prisma configuration
- `pages`: contains a file for each page of our application, which each contain a functional React component.
- `prisma`: contains the database schema file
- `public`: some public assets such as images.
- `utils`: houses utility functions for functionalities across the application.
- `README.md`: the thing you are reading right now.

Description of Test Cases:

We use Jest and Enzyme for testing our application.

- `index.test.jsx`: tests the Home page render. This includes a snapshot test, tests for checking for components, and a test for the arrow button click.
- `login.test.jsx`: tests the Login page render. This includes a snapshot test, and tests for checking for components.
- `login.error.test.jsx`: tests the Login error page render. This includes a snapshot test, and tests for checking for components.
- `edamam.test.jsx`: tests the Recipe and Filter classes. This includes tests for the Filter constructor, tests for the generateUrl() and queryAPI() functions in the Filter class, and tests for the parseJson() function in the Recipe class.
