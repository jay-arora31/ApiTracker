# API Tracking Dashboard Dashboard

This project is an API Dashboard built with Django as the backend using PostgreSQL as the database and React for the frontend. It provides a simple Todo application where users can create, read, update, and delete tasks, along with monitoring API hits.

## Features

- Create, read, update, and delete Todos.
- Monitor API hit statistics such as request types, browsers used, and average response time.
- Health check endpoint to verify API status.
### Prerequisites

 Python 3.8+
 Django 4.x
 Django REST Framework
 PostgreSQL
 ReactJS
 NodeJS

**Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/ApiTracker.git
   cd ApiTracker
```
 ```sh
cd backend
 ```
   Inshstall the required dependencies:
  ```
pip install virtualenv
  ```
```sh
$ virtualenv venv
```
```sh
$ venv\scripts\activate


```
```sh
$ pip install -r requirements.txt


```
Configure Database Settings:

Update the DATABASES settings in ettings.py to match your Database configuration:


**Set Up Environment Variables:**

### Create a .env file in the project root and add the following:
```sh
SECRET_KEY=
DATABASE_NAME=dbname
DATABASE_USER=username
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=

```
Apply database migrations:
```sh
$ python manage.py makemigrations


```
```sh
$ python manage.py migrate


```

Start the development server:
```sh
$ python manage.py runserver


```


### Frontend Setup 

1. Navigate to Frontend Directory:
   ``` bash
   cd frontend
   ```
2. Install Node.js Dependencies:
   ``` bash
    npm install
   ```
3. Run the React Application:
    ``` bash
    npm start
    ```

## API Endpoints

| Method | Endpoint                       | Description                                       | Example Input                              |
|--------|--------------------------------|---------------------------------------------------|--------------------------------------------|
| GET    | `/todos/`                     | Retrieve a list of all Todos.                      | N/A                                        |
| GET    | `/todos/<int:todo_id>/`       | Retrieve a single Todo by ID.                      | `/todos/1/` (where `1` is the Todo ID)   |
| POST   | `/todos-create/`              | Create a new Todo.                                 | `{ "task_name": "Buy groceries"}` |
| PUT    | `/todos-update/<int:todo_id>/`| Update a Todo by ID.                               | `/todos-update/1/` with `{ "task_name": "Buy groceries"}` |
| DELETE | `/todos-delete/<int:todo_id>/`| Delete a Todo by ID.                               | `/todos-delete/1/` (where `1` is the Todo ID) |
| GET    | `/api_data/`                  | Fetch statistics on API hits.                      | N/A                                        |
| GET    | `/health/`                    | Health check for the API. 

## Ouput:

![Screenshot from 2024-10-10 22-09-25](https://github.com/user-attachments/assets/3f990e0e-702a-4cf2-8a08-fad02aac44cc)

![Screenshot from 2024-10-10 22-10-14](https://github.com/user-attachments/assets/18284907-7d69-4d9b-a387-496239469126)
