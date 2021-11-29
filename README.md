# binge

Binge App

Note: Since we did not have a chance to deploy our project, we only support running our web application locally on localhost. In most scenarios, the url for our database would be kept secret but to support running the project locally, we pushed it in our .env file.

Setup steps:
- First, clone this repository into your local machine and cd into it.
- Next, run `npm i` to install the dependencies necessary to run the application.<br />
- Then, run `npx prisma generate` to prepare the Prisma database.<br />
- Start the server with `npm run dev` and connect to the application on http://localhost:3000/


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

We use Jest and Enzyme for testing our application.<br />
You can run tests using `npm run test`.

- `index.test.jsx`: tests the Home page render. This includes a snapshot test, tests for checking for components, and a test for the arrow button click.
- `login.test.jsx`: tests the Login page render. This includes a snapshot test, and tests for checking for components.
- `login.error.test.jsx`: tests the Login error page render. This includes a snapshot test, and tests for checking for components.
- `profile.test.jsx`: tests the Profile page render. This includes a snapshot test, and a test to check the form input behavior for editing username.
- `edamam.test.jsx`: tests the Recipe and Filter classes. This includes tests for the Filter constructor, tests for the generateUrl() and queryAPI() functions in the Filter class, and tests for the parseJson() function in the Recipe class.
- `classes.test.jsx`: tests the RecipeStack, User and Chatroom classes. This includes tests for the RecipeStack refreshStack(), getTopRecipe(), acceptTopRecipe() and rejectTopRecipe() functions, the User addMatches() function and the Chatroom recipeResponse() function.
