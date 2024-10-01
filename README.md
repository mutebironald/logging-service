# Logging Service

This project provides a logging service with user authentication, log storage, and reporting features. Users can register, log messages, and generate reports on log data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing the Endpoints](#testing-the-endpoints)
  - [1. User Registration](#1-user-registration)
  - [2. User Authentication](#2-user-authentication)
  - [3. Sending Logs](#3-sending-logs)
  - [4. Generating Reports](#4-generating-reports)


## Prerequisites

- Node.js (version 22.5.1 )
- PostgreSQL database
- A tool for sending HTTP requests (e.g., [Postman](https://www.postman.com/) or [cURL](https://curl.se/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mutebironald/logging-service.git
   cd logging-service
   ```


2. Install the dependencies:
```bash
npm install
```

## Environment Variables

- update the .env with your Database configurations

## Running the Application
```bash
npm run start
```


## Testing the Endpoints
1. User Registration
- Endpoint: POST /api/register
- Request Body 
```json
{
  "email": "test@greenhub.com",
  "password": "yourpassword"
}
```

- Response:
success 
```json
{
    "message": "User registered successfully"
}
```
statusCode 200

Error (if user already exists):
```json
{
    "message": "User already exists"
}
```

statusCode 400

2. User Authentication
- Endpoint: POST /api/login
- Request Body: 
```json
{
  "email": "test@greenhub.com",
  "password": "yourpassword"
}
```

- Response:
success 
```json
{
    "message": "User authenticated successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyb25hbGRAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjc3NjgwNDcsImV4cCI6MTcyNzc3MTY0N30.K3H2JP29JECdU2CERhWkqkNCEDGpICH8Y4s7IpPS1lI"
}
```

Error (if credentials are invalid):
```json
{
    "message": "Invalid email or password"
}
```

3. Sending Logs
- Endpoint: POST /send-logs

- Request Headers
Authorization: Bearer jwt_token
Content-Type: application/json

- Request Body:

```json
[
  {
    "timestamp": "2023-09-20T14:00:00.000Z",
    "level": "error",
    "text": " http://localhost:3000/api/send-logs"
  }
]
```

- Response:
success
```json
{
    "message": "Logs saved successfully"
}
```

4. Generating Reports
- Endpoint: POST /api/report

- Request Headers
Authorization: Bearer jwt_token
Content-Type: application/json

- Request Body:
```json
{
  "startDate": "2023-09-20T00:00:00.000Z",
  "endDate": "2023-11-20T23:59:59.999Z"
}
```

- Response:
success
```json
{
    "startDate": "2023-09-20T00:00:00.000Z",
    "endDate": "2023-11-20T23:59:59.999Z",
    "warningCount": 0,
    "errorCount": 1,
    "messageWithUrlCount": 1
}
```

Error (if endDate is not greater than startDate)
```json
{
    "message": "endDate must be greater than startDate"
}
```
