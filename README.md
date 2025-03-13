## Momentum

Momentum is an all-in-one workout app made with the MERN stack where users can create, schedule, log, and track workouts as well as find a community.

---

Features
--
- **Create Workouts**: Users can create workouts using a list of movements provided by our database. They can customize the sets and reps/duration for each movement.
- **Save Workouts**: Users can save workouts directly from our database or from other users (see Friends feature).
- **Schedule Workouts**: Users can schedule workouts for specific days. For example, if Monday is the user's Leg Day, they can schedule leg workouts saved in their profile to be done on Monday.
- **Log Workouts**: When users actually complete a workout, they can log data about how many sets and reps/duration they actually did as well as any notes and best score reached.
- **Track Workout Progress**: Tracking workout progress is twofold. Users can create benchmarks or goals for each movement. On the analytics page, users can search through all of their logged workout data, see their personal records, and see how close they are to their goals.
- **Spotify**: Spotify Premium users can log into their accounts directy from our app and play, pause, skip, and go back to songs from any of their created playlists.
- **Friends**: Users can search for and follow other users on the app, seeing what workouts they created or have saved.

Technologies
--
- MongoDB
- Express.js
- ReactJS + Vite
- Node.js

Set Up
--
Either clone or download the .zip file for this repository.

### Backend
First, run the commands below to 1) enter the backend folder and 2) install all dependencies as listed in package.json.
```
cd backend
npm install
```
Next, because it is not good practice to include .env files in your GitHub repository, upload the .env file given to you in the backend folder.
Run the command below, which will run the backend server on http://localhost:8080.
```
node server.js
```
Visit http://localhost:8080 in your browser and verify that the only content on the webpage is "Server is running".

### Frontend
Next, open another terminal and navigate to this repository. Run the commands below to 1) enter the frontend folder and 2) install all dependencies as listed in package.json.
```
cd frontend
npm install
```
Run the commands below, which will run the frontend on http://localhost:5173 by default. If this port is not available, the frontend will run on a different port specified in your terminal.
```
npm run dev
```

### Spotify
Optionally, if you choose to connect your Spotify Premium account to this app, ensure that you are NOT playing Spotify on any other app. Spotify's Web Player SDK API will not function as expected if more than one device is attempting to play from the same account. The API also requires that the Spotify account must be Premium.

Also, note that you MUST be running the frontend on http://localhost:5173 in order to run Spotify. The redirect URI given to the Spotify API is http://localhost:5173/callback, so if you click the "Play Spotify" button and are running the frontend on any other port, you will be redirected to http://localhost:5173.

Schemas
---

### User
- name
- username
- email
- password
- savedWorkouts ==> list of workouts
- friends ==> list of users
- schedule ==> list of movements per day
- loggedWorkouts ==> list of loggedWorkouts
- goals ==> list of movement + goal pairs

### Movement
- name
- muscleGroup
- imageUrl

### Workout
- name
- description
- bodyRegion
- movements ==> list of movements with associated sets, metricType (reps or duration), and metricValue (number)
- imageUrl

### Logged Workout
- workouts ==> list of workouts
- date
- movements ==> list of movements with associated sets, metricType (reps or duration),  metricValue (number), and highestData (number for PR)
- totalDuration
- notes

  
Endpoints
--
Any endpoints with the * use authentication middleware to keep track of the logged in user. All these endpoints use req.user to access the logged in user.

### POST /user/join

Requirements: celebrateErrorHandler with specified user validation schema

Function: Creates an account for the user with the specified information if possible. This information is passed through celebrate's error handler, checking for valid email addresses, alphanumeric usernames, alphabetic names, and 8-char minimum passwords.

Request body:
- email
- username
- name
- password

Response
- 201: Joined successfully
- 409: Username or email already in use
- 500: Other error

### POST /user/login

Function: Logs in the user with a JWT that expires in 24 hours if the account details are correct.

Request body:
- username or email
- password

Response
- 201: Logged in successfully
- 401: Incorrect password
- 409: No account for that username/email
- 500: Other error

### GET /users

Function: Retrieves all users for friends-searching in a JSON object

Response
- 201: Successful
- 500: Any error

### GET* /user/friends

Function: Retrieves all friends of the logged in user as a JSON object to display as a dropdown in the following button in the dashboard

Request user: user ID

Response
- 201: Successful
- 404: User not found
- 500: Other error

### GET* /user/:id

Path parameters:
- id: User's ID
  
Function: Retrieves user info populated by the loggedWorkouts and savedWorkouts of the logged in user as a JSON object to display for analytics, dashboard, etc.

Response
- 201: Successful
- 404: User not found
- 500: Other error

### GET /movements

Function: Retrieves all movements in the database as a JSON object to be used to create workouts.

Response
- 201: Successful
- 500: Other error

### GET /movements/:id 

Path parameters:
- id: Movement ID

Function: Retrieves movement by the ID that the user selected from the frontend as a JSON object. The user uses this movement to create workouts.

Response
- 201: Success
- 400: Wrong ID format
- 404: Movement not found
- 500: Other error

### POST /movements/add

Request body:
- name
- muscleGroup
- imageUrl

Function: Creates a new movement and adds it to the database. This functionality is primarily for the developers to add new movements to the database, not for users.

Response
- 201: Success
- 500: Other error

### GET /workouts

Function: Retrieves all workouts as a JSON object so users can save and log workouts of their choosing.

Response
- 201: Success
- 500: Other error

### GET* /workouts/saved

Function: Retrieve all of the logged in user's saved workouts as a JSON object to display on their dashboard for further action.

Response
- 200: Success
- 500: Other error

### POST* /workouts/create

Request body:
- name
- description
- bodyRegion
- movements ==> list of all movements

Function: Create a workout with the user-specified movements and save the workout to the user's profile. This function chooses a random image to add to the workout and sends the workout as a JSON object.

Response
- 201: Success
- 400: A workout with this name already exists
- 500: Other error

### POST* /workouts/:workoutId/save

Request body:
- workoutId

Function: Saves a workout that already exists in the database to a user's profile, and returns the workout as a JSON object.

Response
- 201: Success
- 404: Workout not found
- 500: Other error

### DELETE* /workouts/delete/:workoutId

Path parameters:
- workoutId

Function: Delete a workout from the user's profile and returns "deleted" if it is successful.

Response
- 201: Success
- 404: Workout was never saved to user's profile
- 500: Other error

### POST* /workouts/log

Request body:
- workoutId
- movements
- totalDuration
- notes

Function: Logs a workout that the user just completed with data that the user gives about the workout, including sets and reps for each movement and notes and duration for the whole workout. Returns the workout as a JSON object.

Response
- 201: Success
- 400: Movement data is required
- 405: Workout not found
- 500: Other error

### GET* /workouts/logged

Function: Retrieves all logged workouts of the logged in user populated by workouts and movements. Returns this as a JSON object.

Response
- 200: Success
- 500: Other error

### POST* /users/schedule/add

Request body:
- day
- workoutId

Function: Add a movement that the user specifies to a user-specified day of the week in their schedule. If it is working, an affirmative message is sent as a JSON object.

Response
- 201: Success
- 400: Invalid day
- 404: Workout not found
- 405: Only 2 workouts per day
- 500: Other error

### GET* /users/schedule/get

Function: Returns a JSON object with the user's entire schedule -- the workouts assigned for each day of the week.

Response
- 200: Success
- 404: Schedule not found
- 500: Other error

### GET* /user/goals

Function: Retrieves all of a user's goals, which consists of both the movements and associated number for the goal.

Response
- 201: Success
- 500: Other error

### POST* /user/goals/save

Request body:
- movementId
- goal

Function: Saves the movement specified with a numeric goal from the user to the user's information. 

Response
- Nothing: Success
- 400: Invalid goal
- 500: Error

### POST* /friends/add

Request body:
- friendId

Function: Adds the specified user to the logged in user's friends list through the ID. Returns an affirmative message as a JSON object if successful.

Response
- 201: Success
- 400: Cannot friend yourself or already friends
- 404: Friend not found
- 500: Other error

### DELETE* /friends/remove

REquest body:
- friendId

Function: Removes the specified user from the logged in user's friends list through the ID. Returns an affirmative message as a JSON ojbect if successful.

Response
- 201: Success
- 400: Not previously friends
- 500: Other error
