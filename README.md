# Google Books Search

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contributing](#contributing)
- [Testing](#testing)
- [Additional Info](#additional-info)
- [License](#license)

## Description
This is a MERN stack (MongoDB, Express.js, React.js, Node.js) application that searches Google Books for a given book title, then displays the results. It has a user login function that allows users to save desired book titles from the search results to their accounts. The internal database API functions are provided through a GraphQL API using Apollo Server. Security for the app is ensured by JSON Web Tokens and the jwt-decode module on the client side.

## Features
- User authentication (login and signup)
- Search for books via Google Books API
- Save and manage favorite books
- Responsive design with Bootstrap

## Technologies Used
- **Frontend**: React, Apollo Client, React Bootstrap
- **Backend**: Node.js, Express, Apollo Server, MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/21-MERN-Book-Search-Engine.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 21-MERN-Book-Search-Engine
   ```
3. Install dependencies for both the client and server:
   ```bash
   npm install
   cd client
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the server directory and add your MongoDB URI and JWT secret.
5. Start the application:
   - Run the server:
     ```bash
     npm run start
     ```
   - Run the client:
     ```bash
     npm run start
     ```

**NOTE**: As of November 2022, Heroku has no "free" accounts, so the demo application has been taken offline until another suitable host can be found.

## Usage
Users can search for books by title and save their favorites after logging in. The application will display results and allow for saving book details to the user's account.

## Credits
- **React.js** - A JavaScript library for building user interfaces.
- **Apollo Client** - A framework for binding data to your UI with GraphQL.

## Contributing
Contributions are welcome! Please follow the Contributor Covenant guidelines.

## Testing
No testing is provided.

## Additional Info
For more information, please refer to the project documentation or the official libraries used.

## License
This project is licensed under the [MIT License](LICENSE).
