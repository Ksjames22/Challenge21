# Google Books Search

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
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
