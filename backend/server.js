const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./collections/User')
require('dotenv').config();

const app = express();
const PORT= 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db;
    const newUser = new User({ name: "a name", email:"an email", password: "password"})
    newUser.save();
})
.catch(err => {
    console.error(err);
})

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(PORT, () => {
    console.log('Running on PORT ', PORT);
});
