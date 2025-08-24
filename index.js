const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const groupRoute = require('./routes/groupRoutes');
require('dotenv').config()

const PORT = 3001
const app = express();





app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


mongoose.connect(process.env.MONGOURI)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to database')
})




app.use("/user", userRoute)
app.use("/post", postRoute)
app.use("/group", groupRoute)


// Function to make the HTTP request
function makeRequest() {
    fetch("https://confessionity-server-2-0.onrender.com/post/getpost")
        .then(() => console.log("up and running"))
        .catch(err => console.log("opps! server down"))
}


makeRequest();

setInterval(makeRequest, 13 * 60 * 1000)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}
)