![Galapp Logo](https://static.wixstatic.com/media/c59104_5094a52dbf3548ea97632f6882877d87~mv2.png/v1/fill/w_394,h_152,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/GALAPP_LOCK%20AND%20FELL_WEB%20MOBILE-09.png)


Galapp is an application for collecting data from agricultural companies, focusing on coffee and cocoa crops.

## Prerequisites

- Node.js v20
- npm

## Installation

1. Clone the repository:
   ```
   git clone [repo url]
   cd galapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:
   ```
   DATABASE_URL=http://localhost
   DATABASE_PORT=20000
   ```

## Running the Application

1. Start the database server (from the `database` folder):
   ```
   cd ../database
   npm start
   ```

2. In a new terminal, start the Galapp server:
   ```
   # Run in production mode
   npm start

   # Run in development mode
   npm run dev
   ```

The server will start running on `http://localhost:3000`.

## API Endpoints

1. Get user accounts and accessible forms:
   ```
   GET /api/users/:userId/accounts-forms
   ```

2. Create harvest record:
   ```
   POST /api/harvests/accounts/:accountId
   ```

3. CRUD operations for fermentation records:
   ```
   GET /api/fermentations/accounts/:accountId
   POST /api/fermentations/accounts/:accountId
   PUT /api/fermentations/accounts/:accountId/:fermentationId
   DELETE /api/fermentations/accounts/:accountId/:fermentationId
   ```

## Authentication

For all requests, include the user ID in the `Authorization` header:

Example: 

```
Authorization: user1
```

## Running Tests
To run the test suite:

```
npm test
```

To run tests with coverage:
```
npm test -- --coverage
```


## Notes

- The application requires the database server to be running on port 20000.
- Ensure that both the database server and the Galapp server are running simultaneously for the application to function correctly.