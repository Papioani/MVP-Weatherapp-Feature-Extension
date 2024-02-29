## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### Database Prep

Create `.env` file in project directory and add

```
DB_NAME=weatherapp
DB_PASS=YOUR_PASSWORD
```

(replace `YOUR_PASSWORD` with your actual password)

Alternatively, you can rename the provided `.env.example` file to `.env`.

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database weatherapp;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Run `npm run migrate` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'items' in your database.

<!-- NPM RUN MIGRATE executes all the comments in the file INIT_DB.SQL!!!!!!!!!!!!!!!!!!!!!!!!!! -->

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`

npm install google-map-react Install it !!!
npm install jsonwebtoken bcrypt Install it !!!
npm install dotenv !!!
npm install axios !!!!!!!

server: /_ helpful when your frontend code running on Vite's development server needs to communicate with another server (typically a backend server) to fetch data or resources. _/
proxy:
"/api":
target: "http://localhost:4000", /_ This configuration implies that any request made to paths starting with /api within your frontend code will be redirected to the server running on http://localhost:4000. _/
This is typically used in development to redirect API requests from the frontend to a backend server running locally on port 4000.

"/api": any request that starts with /api will be intercepted by the proxy and forwarded to another server.

Create another endpoint in the backend to test that the token is valid. (folder between client and model) Check file `/guards/userShouldBeLoggedIn.js`
