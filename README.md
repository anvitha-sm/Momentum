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
Next, because it is not good practice to include .env files in your GitHub repository, create a .env file in the backend directory with the following contents.
```
MONGODB_URI=mongodb+srv://cs35lfinalproj:momentum@cs35l.x0b8q.mongodb.net/momentum?retryWrites=true&w=majority&appName=CS35L
JWT_SECRET_KEY=35!L!MoMenTum!
```
These two variables will allow you to connect to the database with users, movements, workouts, etc. listed as well as to verify authentication and authorization.

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
Run the commands beloe, which will run the frontend on http://localhost:5173 by default. If this port is not available, the frontend wil run on a different port specified in your terminal.
```
npm run dev
```

### Spotify
Optionally, if you choose to connect your Spotify Premium account to this app, ensure that you are NOT playing Spotify on any other app. Spotify's Web Player SDK API will not function as expected if more than one device is attempting to play from the same account. The API also requires that the Spotify account must be Premium.

Also, note that you MUST be running the frontend on http://localhost:5173 in order to run Spotify. The redirect URI given to the Spotify API is http://localhost:5173/callback, so if you click the "Play Spotify" button and are running the frontend on any other port, you will be redirected to http://localhost:5173.
