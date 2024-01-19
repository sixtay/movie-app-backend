# Movie App Backend

## Description

This is the backend service for the Movie App, built using NestJS and GraphQL. It provides a robust API for handling movie data, user authentication, and other core functionalities of the Movie App. The backend is connected to a MongoDB database for data persistence.

## Features

- GraphQL API for movie data operations
- User authentication and authorization
- JWT-based token handling
- Connection to MongoDB for data storage

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sixtay/movie-app-backend.git
   cd movie-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:
   - Rename `.env.example` to `.env`
   - Update the variables in `.env` with your own values

### Running the Application

1. Start the server:
   ```bash
   npm run start
   # or
   yarn start
   ```

2. The server will be running on [http://localhost:3001](http://localhost:3001).

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

- `PORT` - The port on which the backend server runs (e.g., 3001)
- `MONGO_URI` - Your MongoDB connection string
- `AUTH_JWT_SECRET` - Secret key for JWT
- `AUTH_JWT_TOKEN_EXPIRES_IN` - JWT token expiration time in seconds
- `JWT_REFRESH_SECRET` - Secret key for JWT refresh token
- `JWT_REFRESH_TTL` - JWT refresh token time to live in seconds
- `JWT_REFRESH_LONG_TTL` - Extended time to live for JWT refresh token in seconds

## Tech Stack

- **Backend:** NestJS, GraphQL
- **Database:** MongoDB
- **Authentication:** JWT

## GraphQL Schema

- Define your GraphQL schema here with details about Queries, Mutations, Types, etc.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Chukwuka Nnorukah - [nnorukah.c@gmail.com](mailto:nnorukah.c@gmail.com)

Project Link: [https://github.com/sixtay/movie-app-backend](https://github.com/sixtay/movie-app-backend)
