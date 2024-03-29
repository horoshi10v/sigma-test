### Main Page
<img src="demo-img.png" alt="main" title="sigma-test-img" >

This is a simple Golang API+React Frontend app for a user management system. It provides CRUD operations for managing user entities.

## Getting Started Golang Api

### Prerequisites

- Golang installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/horoshi10v/sigma-test.git
  
2. Go into the repository:

   ```bash
   cd go-api
3. Install dependencies:
  
     ```bash
     go mod download
     ```
4. Run the API:
   
     ```bash
     go run cmd/main.go
     ```
  The API will be running at http://localhost:8080.

API Endpoints
- **GET** `/users`: Get the list of users.
- **GET** `/users/{id}`: Get a specific user by ID.
- **POST** `/users`: Create a new user.
- **PUT** `/users/{id}`: Update an existing user by ID.
- **DELETE** `/users/{id}`: Delete a user by ID.

## Getting Started React Frontend

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

  ```bash
  cd react-frontend-app
  ```
Install dependencies:

```bash
nmp install
```
Run the React app:
```bash
nmp start
```
The React app will be running at http://localhost:3000.
