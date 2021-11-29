# binge

Binge App

First, run `npm i` to install the dependencies necessary to run the application.
Next, run `npx generate prisma` to prepare the Prisma database.
Now, to start the application, you can run any of the following commands:

- `npm run dev`
  Starts the development server.

- `npm run build`
  Builds the app for production.

- `npm start`
  Runs the built app in production mode.

Folder Structure:

- `__tests__`: contains test cases, which can be run using `npm run test`.
- `classes`: contains the helper classes that keep our functions organized.
- `components`: contains the frontend components that make up our UI.
- `edamamAPI`: contains the API for interfacing with the Edamam API, which we use for retrieving food data. The code here contains everything from making the HTTP request to Edamam to parsing the JSON data into an object that the frontend can easily use.
- `pages`: contains a file for each page of our application, which each contain a functional React component. Also contains the `api` folder which contains our databae API routes.
- `prisma`: contains the database schema file
- `public`: some public assets such as images.
- `utils`: houses utility functions for database functionalities across the application.
- `README.md`: the text you are reading right now.

Description of Test Cases:

We use Jest and Enzyme for testing our application.

- `index.test.jsx`: tests the Home page render. This includes a snapshot test, tests for checking for components, and a test for the arrow button click.
- `login.test.jsx`: tests the Login page render. This includes a snapshot test, and tests for checking for components.
- `login.error.test.jsx`: tests the Login error page render. This includes a snapshot test, and tests for checking for components.
- `profile.test.jsx`: tests the Profile page render. This includes a snapshot test, and a test to check the form input behavior for editing username.
- `edamam.test.jsx`: tests the Recipe and Filter classes. This includes tests for the Filter constructor, tests for the generateUrl() and queryAPI() functions in the Filter class, and tests for the parseJson() function in the Recipe class.