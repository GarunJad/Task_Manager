# Task Management Application

This is a **Task Management** web application built using the **MERN stack** (MongoDB, Express, React, Node.js) for backend and frontend operations. The app allows users to create, update, delete, and mark tasks as completed, while providing a clean and responsive UI powered by **Tailwind CSS**.

## Features

- **Task Management:**
  - Create, edit, and delete tasks.
  - Mark tasks as complete or undo completion.
- **Backend API Integration:**
  - **Node.js & Express** for backend.
  - **Axios** used for sending HTTP requests to the backend.
- **Data Persistence:**
  - MongoDB for task storage.
- **Error Handling:**
  - Proper HTTP status codes and error messages for validation failures and missing resources.
- **Responsive UI:**
  - Built with **Tailwind CSS** for a mobile-friendly, responsive design.

## API Endpoints

- `GET /tasks` - Retrieve all tasks.
- `POST /tasks` - Create a new task.
- `PUT /tasks/:id` - Update an existing task.
- `DELETE /tasks/:id` - Delete a task.

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS for styling
  - Axios for API calls

- **Backend:**
  - Node.js with Express.js
  - MongoDB for database

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager

2. **Install the dependencies for the backend:**

   ```bash
   cd backend
   npm install
3. **Create a .env file in the backend directory and add your MongoDB connection string:**

  ```bash
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Tasks_info?retryWrites=true&w=majority
4. **Run the backend server:**

 ```bash
 npm start
