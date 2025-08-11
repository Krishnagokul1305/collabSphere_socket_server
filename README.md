# collabSphere_socket_server

This repository is **not a standalone project**. It serves as the real-time messaging backend for the main project [collabSphere](https://github.com/Krishnagokul1305/collabSphere) in my account.

It uses Node.js, Express, and Socket.IO to enable real-time communication features (such as chat and notifications) for the collabSphere application. This server allows multiple users to join project-based rooms and exchange messages instantly, supporting collaborative workflows in collabSphere.

## Features

- Real-time communication with Socket.IO for collabSphere
- Project-based room joining
- Message broadcasting and deletion
- CORS enabled for cross-origin requests
- Easily configurable via environment variables

## Installation & Usage

> **Note:** This server is intended to be used as a backend service for the [collabSphere](https://github.com/Krishnagokul1305/collabSphere) project. It is not meant to be run or used independently.

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Krishnagokul1305/collabSphere_socket_server.git
   cd collabSphere_socket_server
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Edit `.env` to set your desired `PORT` and other variables.

4. **Run the server:**
   ```sh
   node app.js
   ```

## Environment Variables

- `PORT`: The port number on which the server will run (default: 5000)

## API Endpoints

- `GET /` — Health check endpoint. Returns a simple message if the server is running.

## Socket.IO Events

- `join-room`: Join a project room. Payload: `{ userId, projectId }`
- `message`: Broadcast a message to a project room. Payload: `{ projectId, ... }`
- `delete-message`: Broadcast message deletion. Payload: `{ messageId, projectId }`
- `user_joined`: Emitted to room when a new user joins. Payload: `{ userId }`
