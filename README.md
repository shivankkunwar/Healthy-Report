# Health Report Application

## Overview

The Health Report Application is a web-based platform that allows users to report injuries and health-related incidents. It consists of two main components: a front-end built with React and a back-end built with Express.js and MongoDB. Users can submit injury reports, view their submitted reports, and sort reports based on various criteria. The application also utilizes Auth0 for user authentication.

## Backend Repository [here](https://github.com/shivankkunwar/Healthy-Report-API-Backend)

## Prerequisites

- Node.js and npm installed.
- MongoDB database setup.
- Auth0 account for authentication.

## Getting Started

1. Clone the repository.

2. Install dependencies for the frontend and backend.

3. Set up configuration files:
   - Create a `.env` file in the `frontend` and `backend` directories to store environment-specific variables, including MongoDB connection URI and Auth0 credentials.

4. Start the frontend and backend servers.

5. Access the application in your browser at `http://localhost:3000`.

## Usage

- Visit the Reports Page to view existing reports and sort them.
- Access the Report Form Page to submit new health reports with injury details.
- Use the Body Map Component to mark injuries on a body diagram.
- Reports are associated with the authenticated user's email address.

## API Endpoints

- `POST /api/report`: Submit a new health report.
- `GET /api/report`: Retrieve user-specific reports with sorting options.

## Dependencies

- Frontend:
  - React
  - axios
  - react-router-dom
  - Auth0 React SDK

- Backend:
  - Express.js
  - MongoDB
  - Auth0 Management API
  - axios

## Contributing

Contributions to this project are welcome. Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Auth0](https://auth0.com/)
